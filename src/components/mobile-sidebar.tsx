import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <DialogTitle hidden>Must exist</DialogTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
