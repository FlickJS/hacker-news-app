const ContactDetails = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
      <p className="mb-2">
        <span className="font-bold">Address:</span> 998 Prince Drive, New York,
        NY 10040
      </p>
      <p className="mb-2">
        <span className="font-bold">Phone:</span>{" "}
        <a
          href="tel:914-850-3712"
          className="text-blue-600 hover:text-blue-800 transition duration-300"
        >
          914-850-3712
        </a>
      </p>
      <p className="mb-2">
        <span className="font-bold">Email:</span>{" "}
        <a
          href="mailto:contact@hackernewsapp.com"
          className="text-blue-600 hover:text-blue-800 transition duration-300"
        >
          contact@hackernewsapp.com
        </a>
      </p>
    </div>
  );
};

export default ContactDetails;
