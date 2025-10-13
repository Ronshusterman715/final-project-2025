import type { FunctionComponent } from "react";

interface AboutAdminProps {}

const AboutAdmin: FunctionComponent<AboutAdminProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">Administrator Capabilities</h2>
      <div className="alert alert-primary">
        <h4 className="alert-heading">
          <i className="fas fa-user-shield me-2"></i>Admin Features
        </h4>
        <p>
          Users defined as system administrators receive access to advanced
          management tools for complete control over the platform's content.
        </p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-transparent">
          <i className="fas fa-plus-circle text-success me-2"></i>
          <strong>Add New Clubs:</strong> Create new club entries with all
          relevant details including images, descriptions, and contact
          information
        </li>
        <li className="list-group-item bg-transparent">
          <i className="fas fa-edit text-warning me-2"></i>
          <strong>Edit Existing Clubs:</strong> Update club information, modify
          descriptions, change images, and keep content current
        </li>
        <li className="list-group-item bg-transparent">
          <i className="fas fa-trash-alt text-danger me-2"></i>
          <strong>Delete Clubs:</strong> Remove clubs that are no longer active
          or relevant from the platform
        </li>
        <li className="list-group-item bg-transparent">
          <i className="fas fa-users-cog text-info me-2"></i>
          <strong>User Management:</strong> View user lists, update permissions,
          manage accounts, and promote users to admin status
        </li>
      </ul>
    </section>
  );
};

export default AboutAdmin;
