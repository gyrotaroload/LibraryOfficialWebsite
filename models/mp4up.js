var    mongo = require('mongodb'),
        Grid = require('gridfs-stream'),
        upload = require('jquery-file-upload-gridfs-middleware');
 
    var app = express();
 //mongoose.connect('mongodb://andythebreaker:iuhihcuw@140.116.132.223:27017/petdatabase_dev', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;
const mongoDBuserName = "linjsing";
const mongoDBpsw = process.env.linjsing;
const mongoDBdataBaseName = "maindb";
//console.log(mongoDBpsw);
//mongodb+srv://linjsing:<password>@cluster0.iupxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const uri = process.env.DBurl||`mongodb+srv://${mongoDBuserName}:${mongoDBpsw}@cluster0.iupxg.mongodb.net/${mongoDBdataBaseName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = new mongo.Db('yourDatabaseName', new mongo.Server("127.0.0.1", 27017));
    var gfs = Grid(db, mongo);
 
    // configure upload middleware
    upload.configure({
        uploadDir: __dirname + '/public/uploads',
        mongoGfs: gfs,
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });
 
    app.configure(function () {
        ...
        app.use('/upload', upload.fileHandler());
        app.use(express.bodyParser());
        ...
    });