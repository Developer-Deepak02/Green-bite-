import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/home/NewsletterSection";
import AppShell from "@/components/shared/AppShell";

export default function HomePage() {
	return (
		<AppShell>
			<>
				<HeroSection />
				<CategorySection />
				<FeaturedDishes />
				<WhyChooseUs />
				<NewsletterSection />
			</>
		</AppShell>
	);
}
