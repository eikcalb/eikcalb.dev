import { Manager, Tap } from "hammerjs";
import { AnimatedSprite, Application, Assets } from "pixi.js";
import { useEffect, useRef, useState } from "react";

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
};

var mc = new Manager(document.body);
mc.add(new Tap({ event: "quadrupletap", taps: 4, }));

const scaleFactor =
  Math.min(global.innerWidth / 800, global.innerHeight / 800) * 0.28;

export const EasterEgg = (props) => {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef();
  const pixiRef = useRef();
  const fallAssetRef = useRef();
  const runAssetRef = useRef();
  const danceAssetRef = useRef();
  const agentStateRef = useRef({
    setup: false,
    status: "",
    nextStatus: "",
    direction: 1,
    count: 0,
  });

  const pxAppRef = useRef();

  const startAudio = () => {
    if (
      !audioRef.current ||
      audioRef.current.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
    ) {
      return;
    }

    audioRef.current.controls = false;
    audioRef.current.loop = true;
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
      // Load textures
      Assets.addBundle("dance", RACCOON.dance);
      Assets.addBundle("fall", RACCOON.fall);
      Assets.addBundle("run", RACCOON.run);

      danceAssetRef.current = await Assets.loadBundle("dance");
      fallAssetRef.current = await Assets.loadBundle("fall");
      runAssetRef.current = await Assets.loadBundle("run");
      agentStateRef.current.status = "";
      agentStateRef.current.nextStatus = "running";
      agentStateRef.current.sprite = new AnimatedSprite(
        Object.values(runAssetRef.current)
      );

      agentStateRef.current.sprite.x = 100;
      agentStateRef.current.sprite.y = global.innerHeight - 400 * scaleFactor;
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
      console.log("Successfully loaded assets!", agentStateRef.current.setup);
    } catch (e) {
      console.log("Failed to load assets!", e);
      setEnabled(false);
    }
  };

  const render = (dt) => {
    // Add rendering logic here
    const { nextStatus, status } = agentStateRef.current;
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
        default:
          agentStateRef.current.sprite.textures = Object.values(
            runAssetRef.current
          );
          agentStateRef.current.sprite.gotoAndPlay(0);
          agentStateRef.current.sprite.animationSpeed = 0.2;
          agentStateRef.current.sprite.loop = true;
      }
      agentStateRef.current.status = nextStatus;
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
            agentStateRef.current.sprite.x = global.innerWidth - 60;
            agentStateRef.current.direction = -1;
            agentStateRef.current.sprite.scale.x = -Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          }
          agentStateRef.current.sprite.x += velocity / 2;
          break;
        case "fall":
          break;
        default:
          if (agentStateRef.current.sprite.x < 20) {
            agentStateRef.current.sprite.x = 20;
            agentStateRef.current.direction = 1;
            agentStateRef.current.sprite.scale.x = Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          } else if (agentStateRef.current.sprite.x > global.innerWidth - 20) {
            agentStateRef.current.sprite.x = global.innerWidth - 60;
            agentStateRef.current.direction = -1;
            agentStateRef.current.sprite.scale.x = -Math.abs(
              agentStateRef.current.sprite.scale.x
            );
          }
          agentStateRef.current.sprite.x += velocity;
      }
    }

    pxAppRef.current.render();
  };

  function handleDeviceMotion(event) {
    const acceleration = event.accelerationIncludingGravity;

    // Calculate the total acceleration vector
    const totalAcceleration = Math.sqrt(
      acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
    );

    const shakeThreshold = 10;

    if (totalAcceleration > shakeThreshold) {
      if (!enabled) {
        setEnabled(true);
      }

      if (agentStateRef.current.sprite) {
        agentStateRef.current.nextStatus = "fall";
      }
    }
  }

  useEffect(() => {
    if (!pxAppRef.current) {
      pxAppRef.current = new Application({
        autoDensity: true,
        backgroundAlpha: 0,
        resizeTo: global.window,
        resolution: 1,
        height: global.innerHeight,
        width: global.innerWidth,
        sharedTicker: true,
      });
      setupPixi();
    }

    mc.on("quadrupletap", () => setEnabled(true));

    if ("DeviceMotionEvent" in window) {
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              global.addEventListener("devicemotion", handleDeviceMotion);
            }
          })
          .catch((error) => {
            console.log("Error requesting permission:", error);
          });
      } else {
        global.addEventListener("devicemotion", handleDeviceMotion);
      }
    }
    return () => {
      global.removeEventListener("devicemotion", handleDeviceMotion);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        pixiRef.current.appendChild(pxAppRef.current.view);
      }
    } else {
      stopAudio();
      if (hasPixiView) {
        pixiRef.current.removeChild(pxAppRef.current.view);
      }
    }
  }, [enabled, pxAppRef]);

  return (
    <div>
      {props.children}
      <audio className="hidden" ref={audioRef} controls={false}>
        <source
          src={`${process.env.PUBLIC_URL}/asset/background.mp3`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      <div className="relative" ref={pixiRef} />
    </div>
  );
};

export default EasterEgg;
