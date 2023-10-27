import { logEvent } from "firebase/analytics";
import { Manager, Tap } from "hammerjs";
import { AnimatedSprite, Application, Assets } from "pixi.js";
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import { APPLICATION_CONTEXT } from "../lib/application";

const RACCOON = {
  fall: {
    fall0: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0000.png`,
    fall1: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0002.png`,
    fall2: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0004.png`,
    fall3: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0006.png`,
    fall4: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0008.png`,
    fall5: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0010.png`,
    fall6: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0012.png`,
    fall7: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0014.png`,
    fall8: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0016.png`,
    fall9: `${process.env.PUBLIC_URL}/asset/raccoon/ko/ko0018.png`,
  },
  idle: {
    idle0: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0001.png`,
    idle1: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0003.png`,
    idle2: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0005.png`,
    idle3: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0007.png`,
    idle4: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0009.png`,
    idle5: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0011.png`,
    idle6: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0013.png`,
    idle7: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0015.png`,
    idle8: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0017.png`,
    idle9: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0019.png`,
    idle10: `${process.env.PUBLIC_URL}/asset/raccoon/idle/0021.png`,
  },
  dance: {
    dance0: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0001.png`,
    dance1: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0003.png`,
    dance2: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0005.png`,
    dance3: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0007.png`,
    dance4: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0009.png`,
    dance5: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0011.png`,
    dance6: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0013.png`,
    dance7: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0015.png`,
    dance8: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0017.png`,
    dance9: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0019.png`,
    dance10: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0021.png`,
    dance11: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0023.png`,
    dance12: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0025.png`,
    dance13: `${process.env.PUBLIC_URL}/asset/raccoon/victory-dance/victory-dance0027.png`,
  },
  run: {
    run0: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0001.png`,
    run1: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0003.png`,
    run2: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0005.png`,
    run3: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0007.png`,
    run4: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0009.png`,
    run5: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0011.png`,
    run6: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0013.png`,
    run7: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0015.png`,
    run8: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0017.png`,
    run9: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0019.png`,
    run10: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0021.png`,
    run11: `${process.env.PUBLIC_URL}/asset/raccoon/run/run0023.png`,
  },
  walk: {
    walk0: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0001.png`,
    walk1: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0003.png`,
    walk2: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0005.png`,
    walk3: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0007.png`,
    walk4: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0009.png`,
    walk5: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0011.png`,
    walk6: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0013.png`,
    walk7: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0015.png`,
    walk8: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0017.png`,
    walk9: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0019.png`,
    walk10: `${process.env.PUBLIC_URL}/asset/raccoon/walk/walk0021.png`,
  },
};
// Load textures
Assets.addBundle("dance", RACCOON.dance);
Assets.addBundle("fall", RACCOON.fall);
Assets.addBundle("idle", RACCOON.idle);
Assets.addBundle("run", RACCOON.run);
Assets.addBundle("walk", RACCOON.walk);

var mc = new Manager(document.body);

const scaleFactor =
  Math.min(global.innerWidth / 800, global.innerHeight / 800) * 0.32;

/**
 * Please 🥺 do not judge me. I know it's rough. This is my first time using
 * PIXI.js. Ideally this should be encapsulated into an architecture where
 * each object is responsible for configuring events and setting render
 * behavior. I did not consider this product to be so complex that it'd need
 * a lot of designs.
 */
export const EasterEgg = (props) => {
  const app = useContext(APPLICATION_CONTEXT);
  const audioRef = useRef();
  const pixiRef = useRef();
  const fallAssetRef = useRef();
  const runAssetRef = useRef();
  const danceAssetRef = useRef();
  const idleAssetRef = useRef();
  const walkAssetRef = useRef();
  const agentStateRef = useRef({
    setup: false,
    status: "",
    nextStatus: "",
    direction: 1,
    count: 0,
    lastStateChangeSince: 0,
  });

  const pxAppRef = useRef();
  const deviceMotionCaptured = useRef(false);

  const [enabled, setEnabled] = useReducer((state) => {
    return !state;
  }, false);

  const toggleAgentState = () => {
    // We want to use other state here based on the duration the agent
    // has been walking for.
    if (
      agentStateRef.current.status === "running" &&
      agentStateRef.current.lastStateChangeSince >= 600
    ) {
      // Toggle between idle state and walking state
      agentStateRef.current.nextStatus = ["walk", "idle"][
        Math.floor(Math.random() * 10) % 2
      ];
    } else if (agentStateRef.current.lastStateChangeSince >= 1200) {
      // Toggle between idle state and walking state
      agentStateRef.current.nextStatus = "running";
    }
  };

  const startAudio = () => {
    if (
      !audioRef.current ||
      audioRef.current.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
    ) {
      audioRef.current.addEventListener("canplay", () => {
        audioRef.current.controls = false;
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      });

      return;
    }

    audioRef.current.controls = false;
    audioRef.current.loop = true;
    audioRef.current.muted = false;
    audioRef.current.volume = 0.5;
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (!audioRef.current || audioRef.current.paused) {
      return;
    }

    audioRef.current.pause();
  };

  const setupPixi = async () => {
    try {
      danceAssetRef.current = await Assets.loadBundle("dance");
      fallAssetRef.current = await Assets.loadBundle("fall");
      runAssetRef.current = await Assets.loadBundle("run");
      idleAssetRef.current = await Assets.loadBundle("idle");
      walkAssetRef.current = await Assets.loadBundle("walk");
      agentStateRef.current.status = "";
      agentStateRef.current.nextStatus = "running";
      agentStateRef.current.sprite = new AnimatedSprite(
        Object.values(runAssetRef.current)
      );

      agentStateRef.current.sprite.x = 100;
      agentStateRef.current.sprite.y = global.innerHeight / 2;
      agentStateRef.current.sprite.cursor = "pointer";
      agentStateRef.current.sprite.scale.set(scaleFactor);
      agentStateRef.current.sprite.anchor.set(0.5);
      agentStateRef.current.sprite.eventMode = "static";

      agentStateRef.current.sprite.play();
      agentStateRef.current.sprite.on("pointertap", () => {
        const { status } = agentStateRef.current;
        if (status === "running") {
          agentStateRef.current.nextStatus =
            agentStateRef.current.count >= 1 ? "dance" : "fall";
        } else {
          agentStateRef.current.nextStatus = "running";
        }
      });

      pxAppRef.current.stage.addChild(agentStateRef.current.sprite);
      pxAppRef.current.ticker.add(render);
      agentStateRef.current.setup = true;
      console.log("Successfully loaded assets!");
    } catch (e) {
      console.log("Failed to load assets!", e);
      setEnabled(false);
    }
  };

  const render = (dt) => {
    const { nextStatus, status } = agentStateRef.current;

    agentStateRef.current.lastStateChangeSince++;
    if (!status && !nextStatus) {
      return;
    }

    if (status !== nextStatus) {
      switch (nextStatus) {
        case "dance":
          agentStateRef.current.count = 0;
          agentStateRef.current.sprite.textures = Object.values(
            danceAssetRef.current
          );
          agentStateRef.current.sprite.gotoAndPlay(0);
          agentStateRef.current.sprite.animationSpeed = 0.28;
          agentStateRef.current.sprite.loop = true;
          break;
        case "fall":
          agentStateRef.current.count++;
          agentStateRef.current.sprite.textures = Object.values(
            fallAssetRef.current
          );
          agentStateRef.current.sprite.gotoAndPlay(0);
          agentStateRef.current.sprite.animationSpeed = 0.12;
          agentStateRef.current.sprite.loop = false;
          break;
        case "idle":
          agentStateRef.current.sprite.textures = Object.values(
            idleAssetRef.current
          );
          agentStateRef.current.sprite.gotoAndPlay(0);
          agentStateRef.current.sprite.animationSpeed = 0.1;
          agentStateRef.current.sprite.loop = true;
          break;
        case "walk":
          agentStateRef.current.sprite.textures = Object.values(
            walkAssetRef.current
          );
          agentStateRef.current.sprite.gotoAndPlay(0);
          agentStateRef.current.sprite.animationSpeed = 0.2;
          agentStateRef.current.sprite.loop = true;
          break;
        default:
          agentStateRef.current.sprite.textures = Object.values(
            runAssetRef.current
          );
          agentStateRef.current.sprite.gotoAndPlay(0);
          agentStateRef.current.sprite.animationSpeed = 0.4;
          agentStateRef.current.sprite.loop = true;
      }
      agentStateRef.current.status = nextStatus;
      agentStateRef.current.lastStateChangeSince = 0;
    } else {
      let velocity = dt * agentStateRef.current.direction;

      switch (status) {
        case "dance":
          if (agentStateRef.current.sprite.x < 20) {
            agentStateRef.current.sprite.x = 20;
            agentStateRef.current.direction = 1;
            agentStateRef.current.sprite.scale.x = Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          } else if (agentStateRef.current.sprite.x > global.innerWidth - 20) {
            agentStateRef.current.sprite.x = global.innerWidth - 20;
            agentStateRef.current.direction = -1;
            agentStateRef.current.sprite.scale.x = -Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          }
          agentStateRef.current.sprite.x += velocity * 0.2;
          break;
        case "fall":
          break;
        case "idle":
          toggleAgentState();
          break;
        case "walk":
          if (agentStateRef.current.sprite.x < 20) {
            agentStateRef.current.sprite.x = 20;
            agentStateRef.current.direction = 1;
            agentStateRef.current.sprite.scale.x = Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          } else if (agentStateRef.current.sprite.x > global.innerWidth - 20) {
            agentStateRef.current.sprite.x = global.innerWidth - 20;
            agentStateRef.current.direction = -1;
            agentStateRef.current.sprite.scale.x = -Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          }
          agentStateRef.current.sprite.x += velocity * 0.8;
          toggleAgentState();
          break;
        default:
          if (agentStateRef.current.sprite.x < 20) {
            agentStateRef.current.sprite.x = 20;
            agentStateRef.current.direction = 1;
            agentStateRef.current.sprite.scale.x = Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          } else if (agentStateRef.current.sprite.x > global.innerWidth - 20) {
            agentStateRef.current.sprite.x = global.innerWidth - 20;
            agentStateRef.current.direction = -1;
            agentStateRef.current.sprite.scale.x = -Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          }
          agentStateRef.current.sprite.x += velocity * 2;
          toggleAgentState();
      }
    }

    pxAppRef.current.render();
  };

  const handleDeviceMotion = useCallback(
    (event) => {
      const acceleration = event.accelerationIncludingGravity;
      const shakeThreshold = 200;
      // Calculate the total acceleration vector
      const totalAcceleration = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );

      if (totalAcceleration > shakeThreshold) {
        if (agentStateRef.current.sprite && enabled) {
          agentStateRef.current.nextStatus = "fall";
        }
      }
    },
    [enabled]
  );

  const setupMotionListener = useCallback(() => {
    if ("DeviceMotionEvent" in window) {
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              global.addEventListener("devicemotion", handleDeviceMotion);
              deviceMotionCaptured.current = true;
            }
          })
          .catch((error) => {
            console.log("Error requesting permission:", error);
          });
      } else {
        global.addEventListener("devicemotion", handleDeviceMotion);
        deviceMotionCaptured.current = true;
      }
    }
  }, [handleDeviceMotion]);

  useEffect(() => {
    if (!pxAppRef.current) {
      pxAppRef.current = new Application({
        autoDensity: true,
        backgroundAlpha: 0,
        resizeTo: global.window,
        resolution: global.devicePixelRatio * 2,
        height: global.innerHeight,
        width: global.innerWidth,
        sharedTicker: true,
      });
      setupPixi();
    }

    mc.add(new Tap({ event: "quadrupletap", taps: 4 }));
    mc.on("quadrupletap", () => {
      console.log("🏳️ Quadriple click activated!");
      setEnabled(!enabled);
    });
    setupMotionListener();

    return () => {
      global.removeEventListener("devicemotion", handleDeviceMotion);
      deviceMotionCaptured.current = false;
      mc.off("quadrupletap");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    logEvent(app.fBaseAnalytics, "screen_view");
  }, [app.fBaseAnalytics, enabled]);

  useEffect(() => {
    if (!pixiRef.current || !pxAppRef.current) {
      return;
    }

    const hasPixiView = pixiRef.current.contains(pxAppRef.current.view);

    if (enabled) {
      startAudio();
      if (!hasPixiView) {
        // Setup PIXI.
        // The operations here should be idemponent for PIXI. This is
        // because PIXI is stateful and we do not want to endup storing
        // unnecessary events.
        pxAppRef.current.ticker.minFPS = 50;
        pxAppRef.current.ticker.start();
        pixiRef.current.classList.remove("hidden");
        pixiRef.current.appendChild(pxAppRef.current.view);
      }
    } else {
      stopAudio();
      pxAppRef.current.ticker.stop();
      pixiRef.current.classList.add("hidden");
      if (hasPixiView) {
        pixiRef.current.removeChild(pxAppRef.current.view);
      }
    }

    if (!deviceMotionCaptured.current) {
      // On some devices, we can only request this permission after user interaction.
      setupMotionListener();
    }

    return () => {
      global.removeEventListener("devicemotion", handleDeviceMotion);
      deviceMotionCaptured.current = false;
    };
  }, [enabled, handleDeviceMotion, pxAppRef, setupMotionListener]);

  return (
    <div>
      {props.children}
      <audio
        muted={false}
        autoPlay={false}
        className="hidden"
        ref={audioRef}
        controls={false}
      >
        <source
          src={`${process.env.PUBLIC_URL}/asset/background.mp3`}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
      <div className="animate__animated animate__heartBeat absolute h-full w-full top-0 hidden" ref={pixiRef} />
    </div>
  );
};

export default EasterEgg;
