const formattDate = ( IsoStrDate )=>{
    const newDate = new Date( IsoStrDate );
    const options = {
      year:"numeric",
      month:"long",
      day:"2-digit"
    }
    return newDate.toLocaleDateString("es-ES", options);
}

export default formattDate;