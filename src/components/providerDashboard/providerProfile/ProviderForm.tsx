"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { providerService } from "@/services/provider.service";
import { ProviderProfileData } from "@/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ---------------- Schema ---------------- */
const providerSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone number is required"),
});

type FormValues = z.infer<typeof providerSchema>;

interface Props {
  provider?: ProviderProfileData;
  userId: string;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ProviderForm({
  provider,
  userId,
  onSaved,
  onCancel,
}: Props) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      restaurantName: provider?.restaurantName ?? "",
      address: provider?.address ?? "",
      phone: provider?.phone ?? "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);

      let logo = provider?.logo;

      /* ---------- Upload logo ---------- */
      if (logoFile) {
        const fd = new FormData();
        fd.append("image", logoFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: fd }
        );

        const data = await res.json();
        if (!data.success) throw new Error("Logo upload failed");

        logo = data.data.url;
      }

      const payload: ProviderProfileData = {
        ...values,
         userId,
        logo,
      };

      const result = provider?.id
        ? await providerService.updateProviderProfile(provider.id, payload)
        : await providerService.createProviderProfile(payload);

      console.log("result:", result.data);

      if (result.error) throw new Error(result.error.message);

      toast.success(
        provider ? "Provider profile updated" : "Provider profile created"
      );
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mb-8 max-w-xl">
      <CardHeader>
        <CardTitle>
          {provider ? "Edit Provider Profile" : "Create Provider Profile"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Restaurant name"
          {...register("restaurantName")}
        />

        <Textarea
          placeholder="Restaurant address"
          {...register("address")}
        />

        <Input
          placeholder="Phone number"
          {...register("phone")}
        />

        <div>
          <label className="text-sm font-medium">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
        >
          {saving ? "Saving..." : provider ? "Update" : "Create"}
        </Button>
      </CardFooter>
    </Card>
  );
}
