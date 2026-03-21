import { useCallback, useEffect, useMemo, useRef } from "react";

import { storeActions, useProgress } from "../../store/main";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

const PARTICLE_COLORS = ["#00d4ff", "#00e5ff", "#40efff", "#80f4ff", "#ffffff"];

const createFloatingNumber = (
  text: string,
  positionX: number,
  positionY: number,
  damage: number
) => {
  const offsetX = 60 * (Math.random() - 0.5);
  const offsetY = -10 - Math.random() * 20;

  const el = document.createElement("div");
  el.innerText = `+${text}`;
  el.style.position = "fixed";
  el.style.left = `${positionX + offsetX}px`;
  el.style.top = `${positionY + offsetY}px`;
  el.style.pointerEvents = "none";
  el.style.zIndex = "10000";
  el.style.fontFamily = "'Fredoka One', cursive";
  el.style.fontWeight = "700";
  el.style.textShadow = "0 0 8px #00d4ff, 0 0 16px #00d4ff40";
  el.style.transition = "all 1.5s ease-out";

  // Vary size based on damage magnitude
  const sizeBase = Math.min(2.4, 1.6 + Math.log10(Math.max(1, damage)) * 0.15);
  el.style.fontSize = `${sizeBase}rem`;

  // Gradient from cyan to white based on damage
  const whiteness = Math.min(255, 180 + Math.floor(Math.random() * 75));
  el.style.color = `rgb(${whiteness}, ${whiteness}, 255)`;

  return el;
};

const createParticle = (positionX: number, positionY: number) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 40 + Math.random() * 80;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;
  const size = 3 + Math.random() * 5;

  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.left = `${positionX}px`;
  el.style.top = `${positionY}px`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = "50%";
  el.style.pointerEvents = "none";
  el.style.zIndex = "10000";
  el.style.transition = "all 0.6s ease-out";
  el.style.backgroundColor =
    PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  el.style.boxShadow = `0 0 6px ${el.style.backgroundColor}`;

  // Store target transform for animation
  el.dataset.dx = `${dx}`;
  el.dataset.dy = `${dy}`;

  return el;
};

const Trigger = () => {
  const state = useProgress();
  const timeOuts = useRef<number[]>([]);

  const clickPower = useMemo(
    () => toHumanReadable(state.clickDps, state.settings.notation),
    [state.clickDps, state.settings.notation]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const dmg = storeActions.handleClick();
      const dmgText = toHumanReadable(dmg, state.settings.notation);
      const { clientX, clientY } = event;

      // Floating damage number
      if (state.settings.floatingNumbers) {
        const hitEl = createFloatingNumber(dmgText, clientX, clientY, dmg);
        document.body.appendChild(hitEl);

        // Trigger animation on next frame
        const animTimeout = window.setTimeout(() => {
          hitEl.style.transform = "translateY(-120px)";
          hitEl.style.opacity = "0";
        }, 16);
        timeOuts.current.push(animTimeout);

        const removeTimeout = window.setTimeout(() => {
          hitEl.remove();
        }, 1600);
        timeOuts.current.push(removeTimeout);
      }

      // Particle burst
      if (state.settings.particleEffects) {
        const particleCount = 6 + Math.floor(Math.random() * 3); // 6-8
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
          const particle = createParticle(clientX, clientY);
          document.body.appendChild(particle);
          particles.push(particle);
        }

        // Animate particles outward on next frame
        const particleAnimTimeout = window.setTimeout(() => {
          particles.forEach((p) => {
            const dx = parseFloat(p.dataset.dx || "0");
            const dy = parseFloat(p.dataset.dy || "0");
            p.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
            p.style.opacity = "0";
          });
        }, 16);
        timeOuts.current.push(particleAnimTimeout);

        // Remove particles after animation
        const particleRemoveTimeout = window.setTimeout(() => {
          particles.forEach((p) => p.remove());
        }, 700);
        timeOuts.current.push(particleRemoveTimeout);
      }
    },
    [
      state.settings.floatingNumbers,
      state.settings.particleEffects,
      state.settings.notation,
    ]
  );

  useEffect(() => {
    return () => {
      timeOuts.current.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <Styled.TriggerWrapper>
      <Styled.ParticleContainer />
      <Styled.TriggerButton onClick={handleClick}>&#9889;</Styled.TriggerButton>
      <Styled.ClickPower>
        &#9889; <span>{clickPower}</span> per click
      </Styled.ClickPower>
    </Styled.TriggerWrapper>
  );
};

export default Trigger;
