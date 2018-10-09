module.exports =
{
/*
 * Rot any nmmber : string rot(nb, str)
 */
str_rot: function(num, str) {
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	var newStr = "";
	num = num % 26;
	for (var i = 0; i < str.length; i++) {
		var char = str[i],
		isUpper = char === char.toUpperCase() ? true : false;

		char = char.toLowerCase();

		if (alphabet.indexOf(char) > -1) {
			var newIndex = alphabet.indexOf(char) + num;
			if(newIndex < alphabet.length) {
				isUpper ? newStr += alphabet[newIndex].toUpperCase() : newStr += alphabet[newIndex];
			} else {
				var shiftedIndex = -(alphabet.length - newIndex);
				isUpper ? newStr += alphabet[shiftedIndex].toUpperCase() : newStr += alphabet[shiftedIndex];
			}
		} else {
			newStr += char;
		}
	}
	return newStr;
},

/*
 * Filter int number before parseInt to avoid 42toto to be considered like 42
 */

filterInt: function(value) {
	if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
		return Number(value);
	return NaN;
},

/*
 * Function createFileSystem
 */
createFileSystem: function(file)
{
	const fs = require('fs');
	try
	{
		var data = fs.readFileSync(file, 'utf8');
	}
	catch(error)
	{
		console.log('Error:', error.stack);
	}
	var lines = data.split('\n'), files = [];
	for (var i = 1; i < lines.length; ++i)
	{
		var words = lines[i].split(',');
		if (words.length == 4)
			files.push(new File(words[0], words[1], words[2], words[3], files));
	}
	var root = getFile(files, "/");
	if (root)
		return (root);
	else
		throw ("Error: root is not found");
},

/*
 * Function cd
 */
cd: function(root, curDir, args)
{
	if (args.length != 1)
		return ([curDir, "Usage : cd PATH"]);
	var path = args[0].replace(/\/+/g, '/'), i = 0;
	if (path.charAt(0) == '/')
	{
		var tmpDir = root;
		if (path.length == 1)
			++i;
	}
	else
		var tmpDir = curDir;
	path = path.replace(/^\/+|\/+$/gm,'');
	path = path.split('/')
	while (i < path.length)
	{
		if (path[i] == "..")
		{
			if (tmpDir.parent)
				tmpDir = tmpDir.parent;
		}
		else if (path[i] != ".")
		{
			tmpDir = getFile(tmpDir.children, path[i]);
			if (tmpDir == null)
				return ([curDir, "cd: " + args[0] + ": No such file or directory"]);
			else if (tmpDir.isDir == false)
				return ([curDir, "cd: " + args[0] + ": Not a directory"]);
		}
		++i;
	}
	return ([tmpDir, "switching to " + args[0] + " directory"]);
},

/*
 * Function ls
 */
ls: function(curDir, args)
{
	if (args.length == 0)
		return (getLsContent(curDir.children, args, false));
	if (args.length == 1)
	{
		if (args[0] == "-a")
			return (getLsContent(curDir.children, args, true))
		return ("ls: invalid option -- " + "\'" + args[0] + "\'");
	}
	return ("Usage : ls OPTION");
},

/*
 * Function cat
 */
cat: function(curDir, args)
{
	if (args.length != 1)
		return ("Usage : cat FILE");
	curDir = getFile(curDir.children, args[0]);
	if (curDir == null)
		return ("cat: " + args[0] + ": No such file or directory");
	if (curDir.isDir == true)
		return ("cat: " + args[0] + ": Is a directory");
	return (curDir.content);
},

/*
 * Function pwd
 */
pwd: function(curDir)
{
	var pwd = curDir.name;
	while (curDir.parent)
	{
		if (curDir.parent.name == "/")
			pwd = curDir.parent.name + pwd;
		else
			pwd = curDir.parent.name + "/" + pwd;
		curDir = curDir.parent;
	}
	return (pwd);
}
}

/*
 * Function getFile
 */
function getFile(files, name)
{
	for (var i = 0; i < files.length; ++i)
	{
		if (files[i].name == name)
			return (files[i]);
	}
	return (null);
}

/*
 * Constructor File
 */
function File(name, parent, isDir, content, files)
{
	this.name = name;
	this.parent = getFile(files, parent);
	isDir == "true" ? this.isDir = true : this.isDir = false;
	content == "null" ? this.content = null : this.content = content;
	this.children = [];
	if (this.parent)
		this.parent.children.push(this);
}


/*
 * Function getLsContent
 */
function getLsContent(children, args, hidden)
{
	var i = 0;
	var str = "";

	while (i < children.length)
	{
		if (children[i].name[0] != "." || hidden == true)
		{
			str += children[i].name;
			i++;
			if (i < children.length)
				str += "<br>";
		}
		else
			++i;
	}
	return (str);
}
