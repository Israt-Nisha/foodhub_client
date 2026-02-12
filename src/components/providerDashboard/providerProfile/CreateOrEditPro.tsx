"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ProviderProfileData } from "@/types";
import { providerService } from "@/services/provider.service";
import ProviderForm from "./ProviderForm";

interface Props {
    userId: string;
}

const ProviderProfileManage = ({ userId }: Props) => {
    const [provider, setProvider] = useState<ProviderProfileData | null>(null);
    const [loading, setLoading] = useState(false);

    const [openForm, setOpenForm] = useState(false);


    const fetchProfile = async () => {
        setLoading(true);

        const res = await providerService.getAllProviders();

        if (!res?.error && Array.isArray(res.data)) {
            const foundProvider = res.data.find(
                (p: any) => p.userId === userId
            );

            setProvider(foundProvider ?? null);
        } else {
            setProvider(null);
        }

        setLoading(false);
    };


    useEffect(() => {
        fetchProfile();
    }, [userId]);

    //  Delete provider profile
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your provider profile?"
        );

        if (!confirmed || !provider?.id) return;

        try {
            const res = await providerService.deleteProviderProfile(provider.id);

            if (res.error) {
                throw new Error(res.error.message);
            }

            toast.success("Provider profile deleted");
            setProvider(null);
        } catch (err: any) {
            toast.error(err.message || "Failed to delete profile");
        }
    };

    return (
        <>


            {/* Profile display */}
            {loading ? (
                <p>Loading profile...</p>
            ) : provider ? (
                <div className="border mb-6 rounded-xl p-4 space-y-2 max-w-sm">
                    <h3 className="font-bold text-lg">
                        {provider.restaurantName}
                    </h3>

                    <p className="text-sm text-gray-600">
                        {provider.address}
                    </p>

                    <p className="text-sm">
                        {provider.phone}
                    </p>

                    {provider.logo && (
                        <img
                            src={provider.logo}
                            alt="Restaurant Logo"
                            className="w-20 h-20 object-cover rounded-md"
                        />
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <Button size="sm" onClick={() => setOpenForm(true)}>
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">
                    No provider profile found. Create one to start selling.
                </p>

            )}

            {!provider &&
                <div className="mt-6">

                    <Button
                        onClick={() => setOpenForm(true)}
                    >
                        + Create Provider Profile
                    </Button>
                </div>
            }


            {/* Form */}
            {openForm && (
                <ProviderForm
                    provider={provider ?? undefined}
                    userId={userId}
                    onSaved={() => {
                        setOpenForm(false);
                        fetchProfile();
                    }}
                    onCancel={() => setOpenForm(false)}
                />
            )}

        </>
    );
};

export default ProviderProfileManage;
