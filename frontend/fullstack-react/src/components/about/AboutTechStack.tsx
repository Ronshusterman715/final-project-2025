import type { FunctionComponent } from "react";

interface AboutTechStackProps {}

const AboutTechStack: FunctionComponent<AboutTechStackProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">Technology Stack</h2>
      <div className="row text-center">
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fab fa-react fa-2x text-info mb-2"></i>
            <h5 className="mb-0">React</h5>
            <small className="text-muted">Frontend Library</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fab fa-js fa-2x text-warning mb-2"></i>
            <h5 className="mb-0">TypeScript</h5>
            <small className="text-muted">Type Safety</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fab fa-node fa-2x text-success mb-2"></i>
            <h5 className="mb-0">Node.js</h5>
            <small className="text-muted">Backend Runtime</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fas fa-server fa-2x text-secondary mb-2"></i>
            <h5 className="mb-0">Express</h5>
            <small className="text-muted">API Framework</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fas fa-database fa-2x text-success mb-2"></i>
            <h5 className="mb-0">MongoDB</h5>
            <small className="text-muted">Database</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fas fa-shield-alt fa-2x text-primary mb-2"></i>
            <h5 className="mb-0">JWT</h5>
            <small className="text-muted">Authentication</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fas fa-route fa-2x text-danger mb-2"></i>
            <h5 className="mb-0">React Router</h5>
            <small className="text-muted">Navigation</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <div className="p-3 border rounded shadow-sm h-100">
            <i className="fas fa-exchange-alt fa-2x text-info mb-2"></i>
            <h5 className="mb-0">Axios</h5>
            <small className="text-muted">HTTP Client</small>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="h5 mb-3">
          <i className="fas fa-shield-alt text-primary me-2"></i>
          Security Features
        </h3>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <i className="fas fa-check-circle text-success me-2 mt-1"></i>
              <div>
                <strong>Password Encryption:</strong> All passwords are hashed
                using bcrypt before storage
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <i className="fas fa-check-circle text-success me-2 mt-1"></i>
              <div>
                <strong>JWT Authentication:</strong> Secure token-based
                authentication system
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <i className="fas fa-check-circle text-success me-2 mt-1"></i>
              <div>
                <strong>CORS Protection:</strong> Cross-Origin Resource Sharing
                security measures
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <i className="fas fa-check-circle text-success me-2 mt-1"></i>
              <div>
                <strong>Input Validation:</strong> Server and client-side data
                validation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTechStack;
