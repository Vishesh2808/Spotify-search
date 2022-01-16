const StyleSheet = {
  section: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    marginLeft: "auto",
    marginRight: "auto",
    width: "40%",
    height: 400,
    color: "white",
  },
  input: {
    height: 40,
    width: "auto",
    borderRadius: "25px",
    border: "0",
    fontFamily: "Shippori Antique",
    marginRight: 20,
    marginTop: "auto",
    marginBottom: "auto",
    padding: 20,
    outline: "none",
  },
  heading: {
    height: 60,
    fontSize: 48,
    paddingTop: 50,
  },
  goButton: {
    height: 32,
    width: 48,
    borderRadius: 4,
    border: 0,
    marginTop: "auto",
    marginBottom: "auto",
  },
  Song: {
    display: "grid",
    gridTemplateColumns: "1fr 6fr 1fr",
    width: "70%",
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    marginTop: 10,
  },
  textDiv: {
    marginRight: "auto",
    marginLeft: 50,
    marginTop: 0,
    paddingTop: 0,
  },
  spotifyLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    margin: "auto",
  },
  searchBar: {
    display: "grid",
    gridTemplateColumns: "20fr 1fr",
  },
};
export default StyleSheet;