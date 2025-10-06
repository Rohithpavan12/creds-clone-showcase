import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addContactMessage } from "@/lib/storage";

const StickyContactPrompt = () => {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => {
      if (hasShown) return;
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y > 600) {
        setOpen(true);
        setHasShown(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasShown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    addContactMessage({
      name: form.name,
      email: form.email,
      message: form.message,
      source: "sticky_prompt",
    });
    setOpen(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Have a question? Let's talk.</DialogTitle>
          <DialogDescription>
            Share your details and we will reach out shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sc-name">Name</Label>
            <Input id="sc-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sc-email">Email (optional)</Label>
            <Input id="sc-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sc-msg">Message</Label>
            <Textarea id="sc-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>Maybe later</Button>
            <Button variant="cta" type="submit">Send</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StickyContactPrompt;
