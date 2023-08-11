interface Vehicle_Type {
    bicycling: boolean
    driving: boolean
    walking: boolean
}

export interface ParcellsType {
    parcel_description: string
    parcel_img_url: string
    parcel_max_weight: number
    parcel_min_weight: number
    parcel_type: string
    vehicle_type: Vehicle_Type
}



export interface PricingDataBody {
    origin?: {
        lat: number;
        lng: number;
    };
    destination?: {
        lat: number;
        lng: number;
    };
    vehicle_type: Vehicle_Type
    parcel_description: string
    parcel_img_url: string
    parcel_max_weight: number
    parcel_min_weight: number
    parcel_type: string
}

interface Pricing {
    price: string,
    distance: number,
    time: string,
    duration: number,
    type: string,
    length: string,
}

export interface PricingDataRes {
    status: string
    code: number
    message?: string | null
    walking?: Pricing | null
    riding?: Pricing | null
    cycling?: Pricing | null
}