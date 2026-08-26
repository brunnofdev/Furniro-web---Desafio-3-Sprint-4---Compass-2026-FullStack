import { useEffect } from "react";
import { type UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import { type CheckoutFormData } from "../../schemas/zodSchema";
import { fetchAddressByCep } from "../../api/cepApi";

export function useViaCep(
  zipCodeValue: string | undefined,
  setValue: UseFormSetValue<CheckoutFormData>,
) {
  useEffect(() => {
    const cep = zipCodeValue?.replace(/\D/g, "");

    if (cep?.length === 8) {
      fetchAddressByCep(cep)
        .then((data) => {
          if (data.erro) {
            toast.error("CEP not found!");
            return;
          }
          setValue("country", "Brazil");
          setValue("streetAddress", data.logradouro);
          setValue("city", data.localidade);
          setValue("province", data.uf);
        })
        .catch(() => {
          toast.error("Error while fetching address data!");
        });
    }
  }, [zipCodeValue, setValue]);
}
