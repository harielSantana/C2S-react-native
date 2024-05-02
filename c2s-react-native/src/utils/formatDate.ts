export const formatDate = (dateString: string, format: 'dd/mm/yyyy' | 'pt-BR' = 'dd/mm/yyyy'): string => {
    const birthDate = new Date(dateString);
  
    if (!birthDate.getTime()) { // Handle invalid dates (optional)
      console.warn('Invalid date:', dateString);
      return ''; // Or return a default value if desired
    }
  
    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(birthDate.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  
    // Construct the formatted date string based on the format
    switch (format) {
      case 'dd/mm/yyyy':
        return `${day}/${month}/${year}`;
      case 'pt-BR':
        return birthDate.toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      default:
        console.warn('Unsupported date format:', format);
        return dateString; // Or return a default value if desired
    }
  };
  