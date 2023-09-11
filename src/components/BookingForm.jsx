import { useForm } from "react-hook-form";
import { Button, Input, Typography } from "@mui/material";
import toast from "react-hot-toast";
import useStore from "../store";
import PropTypes from "prop-types"; // Importa PropTypes

const BookingForm = ({ hotel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addReservation = useStore((state) => state.addReservation);

  const onSubmit = (data) => {
    // Aquí podrías agregar una validación adicional antes de enviar la reserva.
    if (isValidReservation(data)) {
      addReservation(hotel, data);
      toast.success("Reserva realizada con éxito.");
    } else {
      toast.error("La reserva no es válida. Verifica las fechas.");
    }
  };

  // Función de validación personalizada para comprobar si las fechas son válidas.
  const isValidReservation = (data) => {
    const { startDate, endDate } = data;
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start > today && start < end;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="date"
        {...register("startDate", { required: true })}
        label="Fecha de inicio"
      />
      {errors.startDate && (
        <Typography style={{ color: "red" }}>
          La fecha de inicio es obligatoria
        </Typography>
      )}
      <br />
      <Input
        type="date"
        {...register("endDate", { required: true })}
        label="Fecha de finalización"
      />
      {errors.endDate && (
        <Typography style={{ color: "red" }}>
          La fecha de finalización es obligatoria
        </Typography>
      )}
      <br />
      <br />
      <Button variant="contained" type="submit">
        Hacer reserva
      </Button>
    </form>
  );
};

// Agrega la validación de tipo utilizando PropTypes
BookingForm.propTypes = {
  hotel: PropTypes.object.isRequired, // Reemplaza 'object' con el tipo adecuado
};

export default BookingForm;
