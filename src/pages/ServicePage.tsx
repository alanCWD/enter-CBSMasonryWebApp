import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import CTABanner from "@/components/CTABanner";
import BBBSection from "@/components/BBBSection";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceIntro from "@/components/service/ServiceIntro";
import ServiceSections from "@/components/service/ServiceSections";
import BeforeAfter from "@/components/service/BeforeAfter";
import ProjectGallery from "@/components/service/ProjectGallery";
import NotFound from "./NotFound";
import { useMediaSlots } from "@/hooks/useMediaSlots";
import { usePublicMedia, type PublicPhoto } from "@/hooks/usePublicMedia";
import { servicePageBySlug, slotKeysForPage } from "@/lib/servicePages";

interface ServicePageProps {
  slug: string;
}

/** Stable empty list, so the gallery is not re-rendered on every render. */
const NO_PHOTOS: PublicPhoto[] = [];

/** Shared layout for every service page, driven by the definitions in lib/servicePages. */
const ServicePage = ({ slug }: ServicePageProps) => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const page = servicePageBySlug(slug);
  const { slots } = useMediaSlots();
  const { photosByFolder, loading } = usePublicMedia();

  const photos = (page ? photosByFolder[page.folder] : undefined) ?? NO_PHOTOS;

  const galleryPhotos = useMemo(
    () =>
      photos.map((photo) => ({
        src: photo.cdnUrl,
        alt: photo.categoryLabel ? `${photo.categoryLabel} project` : `${page?.title ?? "Service"} project`,
      })),
    [photos, page?.title]
  );

  if (!page) return <NotFound />;

  const keys = slotKeysForPage(page);
  const heroSrc = slots[keys.hero] ?? photos[0]?.cdnUrl;
  const supportingImage = photos[1]?.cdnUrl;
  const asideSrc = page.media?.aside ? slots[page.media.aside.slotKey] : undefined;
  const media = page.media
    ? {
        videoId: page.media.videoId,
        videoCaption: page.media.videoCaption,
        aside:
          page.media.aside && asideSrc
            ? { src: asideSrc, caption: page.media.aside.caption }
            : undefined,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetQuote={() => setQuoteOpen(true)} isInnerPage />

      <main>
        <ServiceHero
          title={page.title}
          subtitle={page.subtitle}
          imageSrc={heroSrc}
          icon={page.icon}
        />
        <ServiceIntro
          heading={page.introHeading}
          lead={page.lead}
          highlights={page.highlights}
          media={media}
          supportingImage={supportingImage}
          supportingAlt={`${page.title} project by CBS Masonry`}
        />
        <ServiceSections sections={page.sections} />
        <BeforeAfter before={slots[keys.before]} after={slots[keys.after]} />
        <ProjectGallery photos={galleryPhotos} loading={loading} />
        <CTABanner onGetQuote={() => setQuoteOpen(true)} />
      </main>

      <BBBSection />
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};

export default ServicePage;
