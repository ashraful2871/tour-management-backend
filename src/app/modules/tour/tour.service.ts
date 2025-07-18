import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

// crete tour
const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error("A tour with this title already exists.");
  }

  const baseSlug = payload.title.toLowerCase().split(" ").join("-");

  let slug = `${baseSlug}`;

  let counter = 0;
  while (await Tour.exists({ slug })) {
    slug = `${slug}-${counter++}`;
  }
  payload.slug = slug;

  const tour = await Tour.create(payload);
  return tour;
};

// get all tour
const getAllTour = async () => {
  const allTour = await Tour.find({});
  return allTour;
};

// update tour
const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found.");
  }
  if (payload.title) {
    const baseSlug = payload.title.toLowerCase().split(" ").join("-");

    let slug = `${baseSlug}`;

    let counter = 0;
    while (await Tour.exists({ slug })) {
      slug = `${slug}-${counter++}`;
    }
    payload.slug = slug;
  }

  const updateTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updateTour;
};

//delete tour
const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};
export const TourServices = {
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};
