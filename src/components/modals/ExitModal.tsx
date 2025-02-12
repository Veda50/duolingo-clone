"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/useExitModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExitModal() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src={"/mascot.svg"} alt="Mascot" width={80} height={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            {"Wait, don't go!"}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {"You're about to leave the lesson. Are you sure?"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="w-full flex flex-col gap-y-4">
            <Button variant="primary" size="lg" className="w-full" onClick={close}>
              Keep Learning
            </Button>
            <Button variant="dangerOutline" size="lg" className="w-full" onClick={() => {
                close();
                router.push("/learn");
            }}>
              End Session
            </Button>          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
