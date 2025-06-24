import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl flex-auto pt-18 pb-10">
      <h2 className="font-kanit text-4xl text-blue-900">Contact Us</h2>
      <p className="font-kanit">สวัสดี</p>
      <Separator className="mt-4 mb-4" />
      <div className="my-3">
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
} 