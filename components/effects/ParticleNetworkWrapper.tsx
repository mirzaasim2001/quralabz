"use client";

import { useEffect, useState } from "react";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function ParticleNetworkWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (!show) return null;
  return <ParticleNetwork />;
}
