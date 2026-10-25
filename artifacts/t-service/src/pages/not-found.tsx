import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/seo/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Seo path="/404" noindex title="Страница не найдена — Т-СЕРВИС" />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Страница не найдена</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 mb-6">
            Такой страницы нет или она переехала. Перейдите на главную или посмотрите наши услуги.
          </p>
          <div className="flex gap-3">
            <a href="/"><Button variant="outline">На главную</Button></a>
            <a href="/uslugi/"><Button className="bg-primary hover:bg-primary/90 text-white">Услуги</Button></a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
