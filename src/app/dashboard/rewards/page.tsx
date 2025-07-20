"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Percent, PlusCircle, Star } from "lucide-react";
import Image from "next/image";

const offers = [
    { id: 1, merchant: 'Starbucks', deal: '10% cash back', logo: '/img/starbucks-logo.png' },
    { id: 2, merchant: 'Walmart', deal: '5% cash back on groceries', logo: '/img/walmart-logo.png' },
    { id: 3, merchant: 'Amazon.com', deal: 'Earn 3x points', logo: '/img/amazon-logo.png' },
    { id: 4, merchant: 'BP', deal: '$0.10 off per gallon', logo: '/img/bp-logo.png' },
    { id: 5, merchant: 'Best Buy', deal: '5% back on electronics', logo: '/img/bestbuy-logo.png' },
    { id: 6, merchant: 'Home Depot', deal: '10% off your purchase of $100+', logo: '/img/homedepot-logo.png' },
];

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-primary to-blue-700 text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-4xl flex items-center gap-2"><Gift /> Ultimate Rewards</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
                <p className="text-lg">You have</p>
                <p className="text-6xl font-bold">50,450</p>
                <p className="text-lg">points available.</p>
            </div>
            <Button variant="secondary" size="lg" className="text-primary font-bold">Redeem Rewards</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Percent /> Chase Offers</CardTitle>
          <CardDescription>
            Earn cash back on everyday purchases with offers just for you. New offers added weekly.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map(offer => (
                <Card key={offer.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                        <Image 
                            src={offer.logo} 
                            alt={`${offer.merchant} logo`} 
                            width={300} 
                            height={150} 
                            className="w-full h-32 object-cover"
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="font-bold">{offer.merchant}</p>
                        <p className="text-sm text-muted-foreground">{offer.deal}</p>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add to card
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
