function Footer() {
  return (
        <footer className="bg-dark text-light py-1 mt-5">
      <div className="container">
        <div className="row align-items-center">
          
        
          <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
            <p className="mb-0">&copy; 2025 Party Time. Todos os direitos reservados.</p>
          </div>
          
         
          <div className="col-md-6 text-md-end text-center">
            <a
              href="https://facebook.com/"
              className="text-light me-3 fs-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              href="https://instagram.com/"
              className="text-light me-3 fs-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/ian-borges-796458294/"
              className="text-light fs-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
