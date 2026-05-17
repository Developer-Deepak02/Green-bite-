import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<CategorySection />
			<FeaturedDishes />
			<WhyChooseUs />
			<NewsletterSection />
		</>
	);
}
