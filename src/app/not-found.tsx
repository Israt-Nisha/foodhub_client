import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Page not found</h1>
                <p>Could not find requested resource</p>
                <Link href="/">
                    <Button>Return home</Button>
                </Link>
            </div>
        </div>
    );
}