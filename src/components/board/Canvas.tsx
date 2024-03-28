"use client";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/props/CanvasProps";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "../../../liveblocks.config";
import { CursorsPresence } from "./CursorPrescense";
import Participants from "./Participants";
import RoomInfo from "./RoomInfo";
import ToolBar from "./ToolBar";
import LayerPreview from "./LayerPreview";
import { connectionIdToColor } from "@/libs/GetBorderColor";
import SelectionBox from "./SelectionBox";
import resizeBounds from "@/libs/ResizeBounds";
import SelectionTools from "./SelectionTools";
import findIntersectingLayers from "@/libs/FindIntersectingLayers";
import CanvasDragButtons from "./CanvasDragButtons";
import penPointsToPathLayer from "@/libs/penPointsToPathLayer";
import Path from "./Path";
import { rgbToHex } from "@/libs/RgbToHex";
import useDisableScrollBounce from "@/hooks/useDisableScrollBounce";
import useDeleteLayers from "@/hooks/useDeleteLayers";
import SettingProps from "@/props/SettingProps";
import Settings from "./Settings";

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

const Canvas = () => {
  // States
  const [settings, setSettings] = useState<SettingProps>({
    showParticpants: true,
    showToolBar: true,
    showScreenButtons: true,
    showBoardInfo: true,
  });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  // Getting all the selections of other uses present in the room
  const selections = useOthersMapped((other) => other.presence.selection);

  // Layers ids of all the layers
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  useDisableScrollBounce();
  // History hook to store actions of the user
  const history = useHistory();
  const undo = history.undo;
  const redo = history.redo;
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  // LAYER FUNCTIONS

  // This function inserts a new layer on the screen
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Path
        | LayerType.Text,
      position: Point
    ) => {
      const limit: number = Number.parseInt(process.env.LAYERS_LIMITS!);
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= limit) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      // Creatind a new unique layer id for the new layer
      const layerId = nanoid();
      // Creating a new layer
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      // @ts-ignore
      liveLayers.set(layerId, layer);

      // Broadcasting the new layer with selection to other users in the room
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  // This function is used to change the size of the selected layer on the screen
  const resizeLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return null;

      // Getings the new coordinates and sizes of the selected layer that is being resized
      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  // This layer is used to boardcast unselection of all the selected layers
  const unSelectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  // This function is used to move the selected layer on the screen
  const translateLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return null;

      // Getting coordinates
      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState]
  );

  // This functon determines the starting points of the selecton net
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, []);

  // This function starts drawing with pencil
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  // Function to keep drawig with pencil
  const continueDrawing = useMutation(
    ({ setMyPresence, self }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );

  const insertPath = useMutation(
    ({ self, storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      const limit: number = Number.parseInt(process.env.LAYERS_LIMITS!);
      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= limit
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor]
  );

  // This function is used select all the layers that comes within the starting and ending point of the seleceting net
  const updateSelectionNet = useMutation(
    ({ setMyPresence, storage }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable(); // Not changeable

      // Setting mode
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      // Getting all the ids of the layers that comes within the selection net
      const ids = findIntersectingLayers(layerIds, layers, origin, current);

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  // Function to move the canvas in Y or X direction based on SCROLL WHEEL
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  // Function to move the canvas in Y or X direction based on KEYBOARD ARROW KEYS
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
    const step = 10;

    switch (e.key) {
      case "ArrowLeft":
        setCamera((prevCamera) => ({ ...prevCamera, x: prevCamera.x + step }));
        break;
      case "ArrowRight":
        setCamera((prevCamera) => ({ ...prevCamera, x: prevCamera.x - step }));
        break;
      case "ArrowUp":
        setCamera((prevCamera) => ({ ...prevCamera, y: prevCamera.y + step }));
        break;
      case "ArrowDown":
        setCamera((prevCamera) => ({ ...prevCamera, y: prevCamera.y - step }));
        break;
      default:
        break;
    }
  }, []);

  // Handling the point move event
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      // Getting XY coordinates with event and camera's current postition
      const current = pointerEventToCanvasPoint(e, camera);

      // Checking the current mode of the canvas that is achieved by different user actions
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateLayer(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e);
      }
      // Setting cursor to current coordinates for boardcasting to other users
      setMyPresence({ cursor: current });
    },
    [
      canvasState,
      resizeLayer,
      camera,
      translateLayer,
      continueDrawing,
      startMultiSelection,
      updateSelectionNet,
    ]
  );

  // When pointer leaves the screen we stop broadcasting our cursor to other users
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  // Handling pointer up evebnt
  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      // getting XY coordinates
      const { x, y } = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unSelectLayer(); // unselecting all the layers
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, { x, y }); // inserting a layer based on the tool the user selected
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      // adding the event to history so user can undo and redo
      history.resume();
    },
    [
      camera,
      canvasState,
      history,
      insertLayer,
      unSelectLayer,
      insertPath,
      setCanvasState,
    ]
  );

  // This function selects a layer on which the user clicks
  // this function is passed to every single layer that is being inserted
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      // Pausing history and stopping propogations
      history.pause();
      e.stopPropagation();

      // Getting coordinated of the layer the user clicked on
      const point = pointerEventToCanvasPoint(e, camera);

      // Broadcasting the selected layer to every other user present in the room
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      // Setting the canvas mode to Translating i.e. moving the selected layer
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  // Handling pointer fown function
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) return null;

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ mode: CanvasMode.Pressing, origin: point });
    },
    [setCanvasState, camera, canvasState.mode, startDrawing]
  );

  // This function sets the canvas mode to resize when we click on the small squares that appears when we select a layer
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();

      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  // Getting a specific color for all the user based on their connection ID
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    // Looping through users
    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const deleteLayers = useDeleteLayers();

  // Putting event listener to window
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Delete":
          deleteLayers();
          break;
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            history.undo();
          }
          break;
        }
        case "y": {
          if (e.ctrlKey || e.metaKey) {
            history.redo();
          }
          break;
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history]);

  return (
    <div className="h-full w-full relative bg-neutral-100 touch-none">
      <div className="absolute top-0 pt-2 left-0 px-3 w-screen flex justify-between items-center flex-wrap gap-y-2">
        {/* Room info */}
        <div className="min-w-[25%] sm:min-w-48">
          {settings.showBoardInfo && <RoomInfo />}
        </div>

        {/* Particpant and settingd */}
        <div>
          {settings.showParticpants && <Participants />}
          <Settings settings={settings} setSettings={setSettings} />
        </div>

        {/* Drag buttons */}
        {settings.showScreenButtons && (
          <CanvasDragButtons setCamera={setCamera} />
        )}
      </div>

      {/* Side tool bar */}
      {settings.showToolBar && (
        <ToolBar
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          canRedo={canRedo}
          canUndo={canUndo}
          redo={redo}
          undo={undo}
          lastUsedColor={lastUsedColor}
          setLastUsedColor={setLastUsedColor}
        />
      )}

      {/* Color, Layers z index and delete tools */}
      <SelectionTools setLastUsedColor={setLastUsedColor} camera={camera} />

      <svg
        className="w-[100vw] h-[100svh] px-2"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {/* All the layers */}
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}

          {/* Selction box that shows up when a layer is selected */}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />

          {/* Selection net */}
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              x={0}
              y={0}
              fill={rgbToHex(lastUsedColor)}
              points={pencilDraft}
            />
          )}
        </g>
      </svg>
    </div>
  );
};

export default Canvas;
