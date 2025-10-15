import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createClub, getClubById, updateClub } from "../services/clubsService";
import { normalizeClub } from "../utils/clubs/normalizeClub";
import { errorMessage, successMessage } from "../utils/ui/alert";
import { useFormik, type FormikValues } from "formik";
import type { Club } from "../interfaces/clubs/Club";
import { useEffect, useState } from "react";
import { clubValidationSchema } from "../validation/clubValidationSchema";

interface UseClubFormProps {
  onClubCreated?: () => void;
  onClubEdited?: () => void;
}

export const useClubForm = ({
  onClubCreated,
  onClubEdited,
}: UseClubFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreateMode = !id;
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateSubmit = async (values: FormikValues) => {
    try {
      const normalizedClub = normalizeClub(values);
      const res = await createClub(normalizedClub);
      successMessage(`${res.data.name} created successfully`);

      if (onClubCreated) {
        await onClubCreated();
      }

      navigate("/");
    } catch (err: any) {
      if (err.response.data)
        errorMessage(`failed to create card - ${err.response.data}`);
      else {
        errorMessage(`failed to create card`);
      }
    }
  };

  const handleEditSubmit = async (values: FormikValues) => {
    try {
      const normalizedClub = normalizeClub(values);
      const res = await updateClub(id!, normalizedClub);
      successMessage(`${res.data.name} updated successfully`);

      if (onClubEdited) {
        await onClubEdited();
      }

      navigate("/");
    } catch (err: any) {
      if (err.response.data)
        errorMessage(`failed to create card - ${err.response.data}`);
      else {
        errorMessage(`failed to create card`);
      }
    }
  };

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      name: "",
      description: "",
      type: "",
      phone: "",
      email: "",
      ageRequirement: "",
      openDays: "",
      openHours: "",
      image: "",
      alt: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      floor: "",
    },
    validationSchema: clubValidationSchema,
    onSubmit: isCreateMode ? handleCreateSubmit : handleEditSubmit,
  });

  const updateFormValues = (club: Club) => {
    formik.setValues({
      name: club.name,
      description: club.description,
      type: club.type,
      phone: club.phone,
      email: club.email,
      ageRequirement: club.ageRequirement,
      openDays: club.openDays,
      openHours: club.openHours,
      image: club.image.url,
      alt: club.image.alt,
      country: club.address.country,
      city: club.address.city,
      street: club.address.street,
      houseNumber: club.address.houseNumber,
      floor: club.address.floor,
    });
  };

  useEffect(() => {
    const loadClubForEdit = async () => {
      if (id && location.state) {
        updateFormValues(location.state);
        setIsLoading(false);
      } else if (id) {
        try {
          const res = await getClubById(id);
          updateFormValues(res.data);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          errorMessage(`failed to load club`);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    loadClubForEdit();
  }, [id]);

  return { formik, isLoading, isCreateMode };
};
