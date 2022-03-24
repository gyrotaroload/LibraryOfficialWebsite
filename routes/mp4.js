var    mongo = require('mongodb'),
        Grid = require('gridfs-stream'),
        upload = require('jquery-file-upload-gridfs-middleware');
 
    var app = express();
 
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