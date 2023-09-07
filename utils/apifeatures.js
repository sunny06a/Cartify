class ApiFeatures {
    constructor(query, queryString) {  //query is Product.find() and queryString is req.query(key value in url)
        this.query = query;
        this.queryString = queryString;
    }

    //search with keyword 
    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword, //regex to search keyword in query
                $options: 'i' //case insensitive (abc==ABC)
            }
        } : {};
        this.query = this.query.find({...keyword}); 
        return this;
    }

    //filter with Category, price, ratings etc
    filter(){
        const queryCopy = {...this.queryString};
        //remove extra fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        //remove fields from queryCopy
        removeFields.forEach(el => delete queryCopy[el]);
        //advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`); //replace gt with $gt etc,
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        //skip is the number of documents to skip
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }


}

module.exports = ApiFeatures;