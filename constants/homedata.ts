import { colors } from "~/theme";

export type Service = {
  id: string;
  title: string;
  image: any;
};

export type InfoBannerData = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  bgColor: string;
  iconColor: string;
};

export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Babysitting",
    image: require("~/assets/images/client/babySitting.png"),
  },
  {
    id: "2",
    title: "Elderly Care",
    image: require("~/assets/images/client/elderlyCare.png"),
  },
  {
    id: "3",
    title: "Child Care",
    image: require("~/assets/images/client/childCare.png"),
  },
];

export const INFO_BANNERS: InfoBannerData[] = [
  {
    id: "1",
    icon: "time-outline",
    title: "Handle your nanny better",
    subtitle: "Read more",
    bgColor: colors.success50,
    iconColor: colors.success400,
  },
  {
    id: "2",
    icon: "star-outline",
    title: "Top rated nannies",
    subtitle: "View profiles",
    bgColor: colors.secondary50,
    iconColor: colors.secondary400,
  },
];
