export const handleChange = (
  setTableData: (updater: (prev: any) => any) => void,
  initialTableData: any,
  setChangedData: (updater: (prev: any) => any) => void,
  key: string,
  value: string | string[] | number | boolean | null,
  type?: string | null 
) => {
  let formattedValue;
  
  console.log(value)
  if (Array.isArray(value) && type) {
    formattedValue = JSON.stringify(
      value.map((id) => ({ 
        [`${type}Id`]: id 
      }))
    );
  } else if(typeof value === "boolean") {
    formattedValue = value ? 1 : 0
  } else {
    formattedValue = value;
  }

  setTableData((prev: any) => {
    if (prev[key]?.toString() === formattedValue?.toString()) return prev;
    return { ...prev, [key]: formattedValue };
  });

  setChangedData((prev: any) => {
    if (!prev) return;
    if (formattedValue?.toString() === initialTableData[key]?.toString()) {
      const { [key]: _, ...rest } = prev;
      return rest;
    }
    return { ...prev, [key]: formattedValue };
  });
};

/*export const handleUnsaved = (
  hasChanges: boolean
) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);
};*/

export const handleSave = async (
  tableData: any,
  setIinitialTableData: (data: any) => void,
  tableName: string,
  guildId: string
) => {
  try {
    const res = await fetch(`/api/database/${tableName}/${guildId}`, {
      method: "POST",
      body: JSON.stringify(tableData),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      setIinitialTableData(tableData);
      //alert("Changes saved successfully!");
    } else {
      throw new Error("Failed to save changes.");
    }
  } catch (error) {
    console.error(error);
    alert("Error saving changes.");
  }
};

export const handleSaveMember = async (
  userData: any,
  tableName: string,
  guildId: string,
  memberId: string
) => {
  try {
    const res = await fetch(`/api/database/${tableName}/${guildId}/${memberId}`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("Failed to save changes.");
    }
  } catch (error) {
    console.error(error);
    alert("Error saving changes.");
  }
};

export const handleReset = (
  setTableData: (data: any) => void,
  initialTableData: any,
  setChangedData: (date: any) => void,
  setItemExist?: any,
  setTableItem?: any
) => {
  setTableData(initialTableData);
  setChangedData({});
  if (setItemExist) setItemExist({});
  if (setTableItem) setTableItem({});
};

export const handleRemove = async (
  userData: any,
  tableName: string,
  
) => {
  try {
    
  } catch (error) {
    
  }
}