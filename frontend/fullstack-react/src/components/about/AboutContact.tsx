import type { FunctionComponent } from "react";

interface AboutContactProps {}

const AboutContact: FunctionComponent<AboutContactProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">Contact & Support</h2>
      <p className="text-muted mb-4">
        If you encounter any issues or have questions, we're here to help!
      </p>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-circle p-3 me-3">
              <i className="fas fa-envelope text-white"></i>
            </div>
            <div>
              <h5 className="mb-0">Email Support</h5>
              <p className="mb-0">
                <a
                  href="mailto:support@clubs.com"
                  className="text-decoration-none"
                >
                  support@clubs.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center">
            <div className="bg-success rounded-circle p-3 me-3">
              <i className="fas fa-phone text-white"></i>
            </div>
            <div>
              <h5 className="mb-0">Phone Support</h5>
              <p className="mb-0">054-123-4567</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center">
            <div className="bg-info rounded-circle p-3 me-3">
              <i className="fas fa-clock text-white"></i>
            </div>
            <div>
              <h5 className="mb-0">Business Hours</h5>
              <p className="mb-0">sun-Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-light border mt-4">
        <div className="d-flex align-items-center">
          <i className="fas fa-info-circle text-primary fa-2x me-3"></i>
          <div>
            <strong>Project Information:</strong> This platform was developed as
            a Full Stack Web Development Final Project. Version 1.0 | Last
            Updated: October 2025
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;
