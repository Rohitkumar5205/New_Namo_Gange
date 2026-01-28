import axiosClient from "./axiosClient";

export interface InitiativeFromAPI {
  _id: string;
  title: string;
  slug: string;
  link: string;
  desc: string;
  image: string;
  status: string;
}

export interface BannerFromAPI {
  image: string;
  title: string;
  link: string;
  status: string;
}
export interface ObjectiveFromAPI {
  _id: string;
  title: string;
  slug: string;
  link: string;
  desc: string;
  image: string;
  status: string;
}
export const apiService = {
  getInitiatives: async (): Promise<InitiativeFromAPI[]> => {
    try {
      const response = await axiosClient.get('/initiatives');
      const resData = response.data;
      if (resData && Array.isArray(resData.data)) return resData.data.filter((b: InitiativeFromAPI) => b.status === 'Active');
      return [];
    } catch (error) {
      console.error("Error fetching initiatives:", error);
      return [];
    }
  },

  getActiveBanners: async (): Promise<BannerFromAPI[]> => {
    try {
      const response = await axiosClient.get('/banner');
      const bannersList: BannerFromAPI[] = response.data?.banners || [];
      return bannersList.filter((b) => b.status === 'Active');
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
    },

    getObjectives: async (): Promise<ObjectiveFromAPI[]> => {
    try {
      const response = await axiosClient.get('/objectives');
      const resData = response.data;
      if (resData && Array.isArray(resData.data)) return resData.data.filter((b: InitiativeFromAPI) => b.status === 'Active');
      return [];
    } catch (error) {
      console.error("Error fetching objectives:", error);
      return [];
    }
  },
};