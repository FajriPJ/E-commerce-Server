const errorHandler = (err, req, res, next) => {
  if(err.status_code === 400){
    res.status(400).json({message: err.message})
  } else if(err.status_code === 401){
    res.status(401).json({message: "unauthorized" || 'no resources found'})
  } else if (err.status_code === 404){
    res.status(404).json({message: "error not found"})
  } else if (err.status_code === 500){
    res.status(500).json({message: "internal server error"})
  } 
}

module.exports = errorHandler