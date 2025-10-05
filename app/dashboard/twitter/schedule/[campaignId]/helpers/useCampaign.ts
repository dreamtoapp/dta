import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TwitterCampaign } from '../types';

export function useCampaign(campaignId: string) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<TwitterCampaign | null>(null);

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const response = await fetch('/api/twitter/campaigns');
        const data = await response.json();

        if (data.success) {
          const foundCampaign = data.data.find((c: TwitterCampaign) => c.id === campaignId);
          if (foundCampaign) {
            setCampaign(foundCampaign);
          } else {
            toast.error('Campaign not found');
            router.push('/dashboard/twitter/schedule');
          }
        } else {
          toast.error(`Failed to load campaign: ${data.error}`);
        }
      } catch (error) {
        toast.error('Failed to load campaign');
        console.error(error);
      }
    };

    loadCampaign();
  }, [campaignId, router]);

  return campaign;
}
