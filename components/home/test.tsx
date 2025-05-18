import { Shield, Users } from "lucide-react";

import { Card, CardContent } from "../ui/card";

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-6 gap-3">
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
              <CardContent className="pt-6">
                <div className="pt-6 lg:px-6"></div>
                <div className="relative z-10 mt-14 space-y-2 text-center">
                  <h2 className="text-lg font-medium transition">
                    Faster than light
                  </h2>
                  <p className="text-foreground">
                    Provident fugit vero voluptate. magnam magni doloribus
                    dolores voluptates inventore nisi.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
