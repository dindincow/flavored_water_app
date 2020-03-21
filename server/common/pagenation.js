
async function getPage(currentPage, pageSize,db,query={}){

    // const userList = await User.find().skip((currentPage - 1)*pageSize).limit(pageSize);
    // const count = await User.count();
    console.log("query==>",query)
  
    let result = await Promise.all([
        db.count(),
        db.find(query).skip((currentPage - 1) * pageSize).limit(pageSize)
    ]);
   
    return {
        count: result[0],
        list: result[1]
    };
}

module.exports= getPage ;
