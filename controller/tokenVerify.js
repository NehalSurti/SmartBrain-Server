exports.tokenVerify = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
