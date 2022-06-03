import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const EditModeContext = React.createContext();

export function EditModeProvider({ children }) {
  const [editMode, setEditMode] = useState({ open: false, item: null });

  const toggleEditMode = (id = null) => {
    if (editMode.open) {
      setEditMode({ open: false, item: null });
      return;
    }

    setEditMode({ open: true, item: id });
  };
  const providerValue = useMemo(() => ([editMode, toggleEditMode]), [editMode, toggleEditMode]);
  return (
    <EditModeContext.Provider value={providerValue}>
      {children}
    </EditModeContext.Provider>
  );
}

export default function useEditMode() {
  return useContext(EditModeContext);
}

EditModeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
