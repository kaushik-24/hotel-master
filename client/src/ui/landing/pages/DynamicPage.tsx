// src/ui/landing/pages/DynamicPage.tsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageNotFound from "@ui/common/pages/PageNotFound";
import RoomTemplate from "./RoomTemplate";
import LandingPageTemplate from "./OtherPageTemplate";
import axiosInstance from "@services/instance";

interface PageData {
  name: string;
  slug: string;
}

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<PageData | null>(null);
  const [notFound, setNotFound] = useState(false);

useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axiosInstance.get(`/api/page/slug/${slug}`);
        setPage(response.data.data);
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchRoom();
  }, [slug]); 

  if (notFound) return <PageNotFound />;

  if (!page) return <div>Loading...</div>;

  // Template decision based on type
  if (page.template === "room") {
    return <RoomTemplate data={page} />;
  } else {
    return <LandingPageTemplate data={page} />;
  }
};

export default DynamicPage;

