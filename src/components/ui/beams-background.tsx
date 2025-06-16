import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

export function BeamsBackground({
  className,
  children,
  intensity = "subtle",
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Настройка размеров canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Параметры лучей
    const beams: Array<{
      x: number;
      y: number;
      length: number;
      width: number;
      angle: number;
      speed: number;
      color: string;
      opacity: number;
    }> = [];

    // Создание начальных лучей
    for (let i = 0; i < 8; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        length: 200 + Math.random() * 400,
        width: 2 + Math.random() * 4,
        angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.3,
        speed: 1 + Math.random() * 2,
        color: `hsl(${30 + Math.random() * 60}, 80%, 60%)`, // Оранжево-желтые тона
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    const animate = () => {
      // Очистка canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Анимация лучей
      beams.forEach((beam, index) => {
        // Движение луча
        beam.y -= beam.speed;
        beam.x += Math.sin(Date.now() * 0.001 + index) * 0.5;

        // Сброс луча когда он выходит за границы
        if (beam.y + beam.length < 0) {
          beam.y = canvas.height + Math.random() * 200;
          beam.x = Math.random() * canvas.width;
        }

        // Рисование луча
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        // Создание градиента для луча
        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
        gradient.addColorStop(0, `hsla(40, 80%, 60%, 0)`);
        gradient.addColorStop(0.2, `hsla(40, 80%, 60%, ${beam.opacity * 0.8})`);
        gradient.addColorStop(0.8, `hsla(50, 90%, 70%, ${beam.opacity})`);
        gradient.addColorStop(1, `hsla(60, 100%, 80%, 0)`);

        // Рисование основного луча
        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);

        // Добавление свечения
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `hsla(45, 90%, 70%, ${beam.opacity * 0.3})`;
        ctx.fillRect(-beam.width * 2, 0, beam.width * 4, beam.length);

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity]);

  return (
    <div
      className={cn("relative min-h-screen w-full overflow-hidden", className)}
    >
      {/* Базовый фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      {/* Canvas с лучами */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 mix-blend-screen"
      />

      {/* Дополнительные эффекты */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Контент */}
      <div className="relative z-30">{children}</div>
    </div>
  );
}
