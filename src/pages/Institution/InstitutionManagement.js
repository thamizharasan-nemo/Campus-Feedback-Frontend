import React, { useEffect, useState } from "react";
import { getInstitutionDashboard, updateInstitution } from "../../services/InstitutionService";

function InstitutionManagement() {
  const [institution, setInstitution] = useState({
    institutionName: "",
    institutionCode: "",
    email: "",
    address: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getInstitutionDashboard().then(setInstitution);
  }, []);

  const handleChange = (e) => {
    setInstitution({
      ...institution,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    updateInstitution(institution)
      .then(() => alert("Institution updated successfully"))
      .catch(() => alert("Update failed"))
      .finally(() => setSaving(false));
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Institution Profile Management</h3>

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <FormField
          label="Institution Name"
          name="institutionName"
          value={institution.institutionName}
          onChange={handleChange}
        />

        <FormField
          label="Institution code"
          name="institutionCode"
          value={institution.institutionCode}
          onChange={handleChange}
        />

        <FormField
          label="Email"
          name="email"
          value={institution.email}
          onChange={handleChange}
        />

        <FormField
          label="Address"
          name="address"
          value={institution.address}
          onChange={handleChange}
        />

        <button className="btn btn-primary mt-3" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

const FormField = ({ label, ...props }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input className="form-control" {...props} />
  </div>
);

export default InstitutionManagement;
