export interface Category {
	_id: string;
	name: string;
	image?: string;
	itemCount?: number;
	description?: string;
	isFeatured?: boolean;
}

export interface MenuItem {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: {
		_id: string;
		name: string;
	};
	isAvailable?: boolean;
	preparationTime?: number;
	ratingAverage?: number;
	ratingCount?: number;
}