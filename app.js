var help=0;

var scenevar=0;

var counter=-1;
var canvas = document.getElementById('canvas');
var fpsIndicator = document.getElementById("fpsIndicator");
var engine = new BABYLON.Engine(canvas, true);

var gameScene;

var createScenemenu = function () {
    var scenemenu = new BABYLON.Scene(engine);
    //engine.displayLoadingUI();
    var directionalLight =  new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-10, -10, -10), scenemenu);
    directionalLight.diffuse = new BABYLON.Color3(1, 1, 1);
    directionalLight.specular = new BABYLON.Color3(1, 1, 1);
    directionalLight.intensity = 0.75;

    const guiMenu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI",true,scenemenu);

    const Title = new BABYLON.GUI.TextBlock();
    Title.text = "PACMAN TIME";
    Title.fontFamily = "My Font";
    Title.fontSize = "80px";
    Title.color = "white";
    Title.resizeToFit = true;
    Title.paddingTop = "40px";
    Title.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    guiMenu.addControl(Title);

    var textblock_info = new BABYLON.GUI.TextBlock();
        textblock_info.paddingTop = "55%";
        
        textblock_info.height = "400px";
        textblock_info.width = "400px";
        
        textblock_info.fontSize = "15px";
        textblock_info.fontFamily = "My Font";
        textblock_info.text = "Use W-A-S-D to move and try to eat all the cubes on the map \n but do not touch the ghosts if you want to win. \n The big cubes allows you to eat ghosts \n for a short period of time, but they will come back after a while \n \n SUGGESTION: \n Press one key at time";
        textblock_info.color = "white";
        guiMenu.addControl(textblock_info);

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Play");
    button1.width = "150px";
    button1.left= "350px";
    button1.height = "100px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "yellow";
    button1.offsetRight = "200px";
    button1.onPointerUpObservable.add(function() {
        counter=-1;
        gameScene=createGameScene();
        scenevar=1;
    });
    guiMenu.addControl(button1);

    
    //scenemenu.clearColor = new BABYLON.Vector3(0,0,0);
	var cameraMenu = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scenemenu);
        cameraMenu.setPosition(new BABYLON.Vector3(0, 50, 150));
		cameraMenu.attachControl(canvas, true);

        var halfsphere1 = BABYLON.MeshBuilder.CreateSphere("halfsphere1", { slice:0.5, diameter: 35, sideOrientation: BABYLON.Mesh.DOUBLESIDE})
        halfsphere1.position.x=20;
        halfsphere1.rotation.x=Math.PI;
        halfsphere1.rotation.y=(0.5/4)*Math.PI;
        halfsphere1.showBoundingBox = false;
        
        const halfsphere1Mat = new BABYLON.StandardMaterial("halfsphere1Mat");
        halfsphere1Mat.diffuseColor = new BABYLON.Color3.Yellow();
        halfsphere1Mat.specularColor = new BABYLON.Color3.Yellow();
        //halfsphere1Mat.emissiveColor = new BABYLON.Color3.Yellow();
        halfsphere1Mat.maxSimultaneousLights = 6;
        halfsphere1.material = halfsphere1Mat;
        
        var disc1 = BABYLON.MeshBuilder.CreateDisc("dis1", {radius: 17.5});
        disc1.parent=halfsphere1;
        disc1.rotation.x=-Math.PI/2;
        const disc1Mat = new BABYLON.StandardMaterial("disc1Mat");
        disc1Mat.diffuseColor = new BABYLON.Color3.Yellow();
        disc1Mat.specularColor = new BABYLON.Color3.Yellow();
        
        disc1Mat.maxSimultaneousLights = 6;
        
        disc1.material = disc1Mat;
    
        var halfsphere2 = BABYLON.MeshBuilder.CreateSphere("halfsphere2", { slice:0.5, diameter: 35, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        halfsphere2.parent=halfsphere1;
        halfsphere2.rotation.x=(4/4)*Math.PI;
    
       
        halfsphere2.material = halfsphere1Mat;
        
        halfsphere2.showBoundingBox = false;
        
        var disc2 = BABYLON.MeshBuilder.CreateDisc("dis1", {radius: 17.5});
        disc2.parent=halfsphere2;
        disc2.rotation.x=-Math.PI/2;

        var paceye1 = BABYLON.MeshBuilder.CreateSphere("paceye1 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        paceye1.parent=halfsphere2;
        paceye1.position.x=7;
        paceye1.position.z=10;
        paceye1.position.y=9;

        var paceye2 = BABYLON.MeshBuilder.CreateSphere("paceye2 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        paceye2.parent=halfsphere2;
        paceye2.position.x=-7;
        paceye2.position.z=10;
        paceye2.position.y=9;

        var pacpupil1 = BABYLON.MeshBuilder.CreateSphere("pacpupil1 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        pacpupil1.parent=paceye1;
        pacpupil1.position.x=1;
        pacpupil1.position.y=1;
        pacpupil1.position.z=4;


        var pacpupil2 = BABYLON.MeshBuilder.CreateSphere("pacpupil2 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        pacpupil2.parent=paceye2;
        pacpupil2.position.x=-1;
        pacpupil2.position.y=1;
        pacpupil2.position.z=4;

        var paceyeMat = new BABYLON.StandardMaterial("pacMat");
        paceyeMat.diffuseColor = new BABYLON.Color3.White();
        paceyeMat.specularColor = new BABYLON.Color3.White();
        paceyeMat.emissiveColor = new BABYLON.Color3.White();
        paceyeMat.maxSimultaneousLights = 6;
        
        paceye1.material = paceyeMat;
        paceye2.material=paceyeMat;

        var pacpupilMat = new BABYLON.StandardMaterial("pacMat");
        pacpupilMat.diffuseColor = new BABYLON.Color3.Black();
        pacpupilMat.specularColor = new BABYLON.Color3.Black();

        pacpupil1.material =pacpupilMat;
        pacpupil2.material =pacpupilMat;
    //GHOST
        var Cylinder = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {height:20, diameter:40}, scenemenu);
        Cylinder.position.x=-25;
        Cylinder.position.y=0;

        Cylinder.rotation.x=0;
        Cylinder.rotation.y=Math.PI - (0.5/4)*Math.PI;

        var ghostHead = BABYLON.MeshBuilder.CreateSphere("ghostHead", { slice:0.5, diameter: 40, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        ghostHead.parent=Cylinder;
        ghostHead.rotation.x=2*(Math.PI);
        ghostHead.position.y=10;

        var ghosteye1 = BABYLON.MeshBuilder.CreateSphere("ghosteye1 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        ghosteye1.parent=Cylinder;
        ghosteye1.position.x=7;
        ghosteye1.position.z=-14;
        ghosteye1.position.y=18;

        var ghosteye2 = BABYLON.MeshBuilder.CreateSphere("ghosteye2 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        ghosteye2.parent=Cylinder;
        ghosteye2.position.x=-7;
        ghosteye2.position.z=-14;
        ghosteye2.position.y=18;

        var ghostpupil1 = BABYLON.MeshBuilder.CreateSphere("ghostpupil1 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        ghostpupil1.parent=ghosteye1;
        ghostpupil1.position.x=1;
        ghostpupil1.position.y=1;
        ghostpupil1.position.z=-4;


        var ghostpupil2 = BABYLON.MeshBuilder.CreateSphere("ghostpupil2 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
        ghostpupil2.parent=ghosteye2;
        ghostpupil2.position.x=-1;
        ghostpupil2.position.y=1;
        ghostpupil2.position.z=-4;
    
        var ghosteyeMat = new BABYLON.StandardMaterial("ghostMat");
        ghosteyeMat.diffuseColor = new BABYLON.Color3.White();
        ghosteyeMat.specularColor = new BABYLON.Color3.White();
        ghosteyeMat.emissiveColor = new BABYLON.Color3.White();
        ghosteyeMat.maxSimultaneousLights = 6;
        
        ghosteye1.material = ghosteyeMat;
        ghosteye2.material=ghosteyeMat;

        var ghostMat = new BABYLON.StandardMaterial("ghostMat");
        ghostMat.diffuseColor = new BABYLON.Color3.Magenta();
        ghostMat.maxSimultaneousLights = 6;
        Cylinder.material = ghostMat;
        ghostHead.material = ghostMat;

        const Pointy = new BABYLON.Animation("Pointy", "position.y", 40, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames3 = []; 

        keyFrames3.push({
            frame: 0,
            value: 0
        });

        keyFrames3.push({
            frame: 40,
            value: -5
        });

        keyFrames3.push({
            frame: 2*40,
            value: 0
        });

        
        Pointy.setKeys(keyFrames3);
        Cylinder.animations.push(Pointy);
        scenemenu.beginDirectAnimation(Cylinder, [Pointy], 0, 2 * 40, true);
const MouthMovement = new BABYLON.Animation("MouthMovement", "rotation.x", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = []; 

        keyFrames.push({
            frame: 0,
            value: (3/4)*Math.PI
        });

        keyFrames.push({
            frame: 5,
            value: Math.PI
        });

        keyFrames.push({
            frame: 2 * 5,
            value: (3/4)*Math.PI
        });
        
        MouthMovement.setKeys(keyFrames);
        
        halfsphere2.animations.push(MouthMovement);

        scenemenu.beginDirectAnimation(halfsphere2, [MouthMovement], 0, 2 * 5, true);

        engine.hideLoadingUI();

    return scenemenu
}

var createLoseScene= function(){
    
    }

var createGameScene = function(){
    var start=false;
    const guiGame = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI",true,gameScene);
    setTimeout(function(){start=true;}, 4000);
   
    var scene = new BABYLON.Scene(engine);
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 3000.0 }, scene);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    
    // Positions the camera overwriting alpha, beta, radius
    camera.setPosition(new BABYLON.Vector3(0, 900, -800));

// This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    //sound eat
    
        
    //skybox
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox2", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;


    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    
    var directionalLight =  new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -100, 0), scene);
    directionalLight.diffuse = new BABYLON.Color3(1, 1, 1);
    directionalLight.specular = new BABYLON.Color3(1, 1, 1);
    directionalLight.intensity = 0.85;
    

    //ground
    var ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 950, height: 950, subdivisions: 4}, scene);
	var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.maxSimultaneousLights = 6;

    //groundMaterial.diffuseColor= new BABYLON.Color3(0,0,0);
	//groundMaterial.specularColor= new BABYLON.Color3(0,0,0);
    //groundMaterial.reflectiveColor= new BABYLON.Color3(0,0,0);

    groundMaterial.diffuseTexture = new BABYLON.Texture("textures/wood.png", scene);
    groundMaterial.specularTexture = new BABYLON.Texture("textures/wood.png", scene);
    ground.material = groundMaterial;


    var box = BABYLON.MeshBuilder.CreateBox("box", {width: 950, height: 50, depth: 50})
    box.position.y=25;
    box.position.z=450;    

    var box2 = BABYLON.MeshBuilder.CreateBox("box2", {width: 950, height: 50, depth: 50})
    box2.position.y=25;
    box2.position.z=-450; 

    var box3 = BABYLON.MeshBuilder.CreateBox("box3", {width: 50, height: 50, depth: 850})
    box3.position.y=25;
    box3.position.x=450; 

    var box4 = BABYLON.MeshBuilder.CreateBox("box4", {width: 50, height: 50, depth: 850})
    box4.position.y=25;
    box4.position.x=-450; 

    var box5 = BABYLON.MeshBuilder.CreateBox("box5", {width: 50, height: 25, depth: 50})
    box5.position.y=12,5;
    box5.position.x=-400;
    box5.position.z=-250;

    var box6 = BABYLON.MeshBuilder.CreateBox("box6", {width: 50, height: 25, depth: 50})
    box6.position.y=12,5;
    box6.position.x=400;
    box6.position.z=-250;

    var box7 = BABYLON.MeshBuilder.CreateBox("box7", {width: 300, height: 25, depth: 50})
    box7.position.y=12,5;
    box7.position.x=225;
    box7.position.z=-350;

    var box8 = BABYLON.MeshBuilder.CreateBox("box8", {width: 300, height: 25, depth: 50})
    box8.position.y=12,5;
    box8.position.x=-225;
    box8.position.z=-350;

    var box9 = BABYLON.MeshBuilder.CreateBox("box9", {width: 250, height: 25, depth: 50})
    box9.position.y=12,5;
    box9.position.x=0;
    box9.position.z=-250;

    var box10 = BABYLON.MeshBuilder.CreateBox("box10", {width: 250, height: 25, depth: 50})
    box10.position.y=12,5;
    box10.position.x=0;
    box10.position.z=-50;

    var box11 = BABYLON.MeshBuilder.CreateBox("box11", {width: 50, height: 25, depth: 100})
    box11.position.y=12,5;
    box11.position.x=0;
    box11.position.z=-125;

    var box12 = BABYLON.MeshBuilder.CreateBox("box12", {width: 50, height: 25, depth: 100})
    box12.position.y=12,5;
    box12.position.x=0;
    box12.position.z=-325;

    var box13 = BABYLON.MeshBuilder.CreateBox("box13", {width: 50, height: 25, depth: 100})
    box13.position.y=12,5;
    box13.position.x=-200;
    box13.position.z=-275;

    var box14 = BABYLON.MeshBuilder.CreateBox("box14", {width: 50, height: 25, depth: 100})
    box14.position.y=12,5;
    box14.position.x=200;
    box14.position.z=-275;

    var box15 = BABYLON.MeshBuilder.CreateBox("box15", {width: 150, height: 25, depth: 50})
    box15.position.y=12,5;
    box15.position.x=-150;
    box15.position.z=-150;

    var box16 = BABYLON.MeshBuilder.CreateBox("box16", {width: 150, height: 25, depth: 50})
    box16.position.y=12,5;
    box16.position.x=150;
    box16.position.z=-150;

    var box17 = BABYLON.MeshBuilder.CreateBox("box17", {width: 50, height: 25, depth: 150})
    box17.position.y=12,5;
    box17.position.x=-300;
    box17.position.z=-200;

    var box18 = BABYLON.MeshBuilder.CreateBox("box18", {width: 50, height: 25, depth: 150})
    box18.position.y=12,5;
    box18.position.x=300;
    box18.position.z=-200;

    var box19 = BABYLON.MeshBuilder.CreateBox("box19", {width: 150, height: 25, depth: 250})
    box19.position.y=12,5;
    box19.position.x=-350;
    box19.position.z=50;

    var box20 = BABYLON.MeshBuilder.CreateBox("box20", {width: 150, height: 25, depth: 250})
    box20.position.y=12,5;
    box20.position.x=350;
    box20.position.z=50;

    var box21 = BABYLON.MeshBuilder.CreateBox("box21", {width: 250, height: 25, depth: 50})
    box21.position.y=12,5;
    box21.position.x=0;
    box21.position.z=50;

    var box22 = BABYLON.MeshBuilder.CreateBox("box22", {width: 250, height: 25, depth: 50})
    box22.position.y=12,5;
    box22.position.x=0;
    box22.position.z=250;

    var box23 = BABYLON.MeshBuilder.CreateBox("box23", {width: 50, height: 25, depth: 100})
    box23.position.y=12,5;
    box23.position.x=0;
    box23.position.z=175;

    var box24 = BABYLON.MeshBuilder.CreateBox("box24", {width: 50, height: 25, depth: 350})
    box24.position.y=12,5;
    box24.position.x=200;
    box24.position.z=100;

    var box25 = BABYLON.MeshBuilder.CreateBox("box25", {width: 50, height: 25, depth: 350})
    box25.position.y=12,5;
    box25.position.x=-200;
    box25.position.z=100;

    var box26 = BABYLON.MeshBuilder.CreateBox("box26", {width: 100, height: 25, depth: 50})
    box26.position.y=12,5;
    box26.position.x=-125;
    box26.position.z=150;

    var box27 = BABYLON.MeshBuilder.CreateBox("box27", {width: 100, height: 25, depth: 50})
    box27.position.y=12,5;
    box27.position.x=125;
    box27.position.z=150;

    var box28 = BABYLON.MeshBuilder.CreateBox("box28", {width: 50, height: 25, depth: 100})
    box28.position.y=12,5;
    box28.position.x=0;
    box28.position.z=375;

    var box29 = BABYLON.MeshBuilder.CreateBox("box29", {width: 100, height: 25, depth: 50})
    box29.position.y=12,5;
    box29.position.x=-325;
    box29.position.z=250;

    var box30 = BABYLON.MeshBuilder.CreateBox("box30", {width: 100, height: 25, depth: 50})
    box30.position.y=12,5;
    box30.position.x=325;
    box30.position.z=250;

    var box31 = BABYLON.MeshBuilder.CreateBox("box31", {width: 100, height: 25, depth: 50})
    box31.position.y=12,5;
    box31.position.x=-325;
    box31.position.z=350;

    var box32 = BABYLON.MeshBuilder.CreateBox("box32", {width: 100, height: 25, depth: 50})
    box32.position.y=12,5;
    box32.position.x=325;
    box32.position.z=350;

    var box33 = BABYLON.MeshBuilder.CreateBox("box33", {width: 150, height: 25, depth: 50})
    box33.position.y=12,5;
    box33.position.x=-150;
    box33.position.z=350;

    var box34 = BABYLON.MeshBuilder.CreateBox("box34", {width: 150, height: 25, depth: 50})
    box34.position.y=12,5;
    box34.position.x=150;
    box34.position.z=350;

    var arrayBoxes= [box,box2,box3,box4,box5,box6,box7,box8,box9,box10,box11,box12,box13,box14,box15,box16,box17,box18,box19,box20,box21,box22,box23,box24,box25,box26,box27,box28,box29,box30,box31,box32,box33,box34];
    const boxesMat = new BABYLON.StandardMaterial("boxesMat");
    
    const eatsound = new BABYLON.Sound("eatsound", "sounds/pacman_chomp.wav", scene);
    
    boxesMat.diffuseTexture = new BABYLON.Texture("textures/gray.jpg",scene);
    boxesMat.specularTexture = new BABYLON.Texture("textures/gray.jpg", scene);
    boxesMat.maxSimultaneousLights = 6;
    for (let i = 0; i < arrayBoxes.length; i++) {
        arrayBoxes[i].material=boxesMat;
        arrayBoxes[i].showBoundingBox=false;
        
    }
    //animation
    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    //PACMAN

    var halfsphere1 = BABYLON.MeshBuilder.CreateSphere("halfsphere1", { slice:0.5, diameter: 35, sideOrientation: BABYLON.Mesh.DOUBLESIDE})
    halfsphere1.position.z=-200;
    halfsphere1.position.y=17.5;
    halfsphere1.rotation.x=-Math.PI;
    halfsphere1.showBoundingBox = false;
    
    const halfsphere1Mat = new BABYLON.StandardMaterial("halfsphere1Mat");
    halfsphere1Mat.diffuseColor = new BABYLON.Color3.Yellow();
    halfsphere1Mat.specularColor = new BABYLON.Color3.Yellow();
    //halfsphere1Mat.emissiveColor = new BABYLON.Color3.Yellow();
    halfsphere1Mat.maxSimultaneousLights = 6;
    halfsphere1.material = halfsphere1Mat;
    
    var disc1 = BABYLON.MeshBuilder.CreateDisc("dis1", {radius: 17.5});
    disc1.parent=halfsphere1;
    disc1.rotation.x=-Math.PI/2;
    const disc1Mat = new BABYLON.StandardMaterial("disc1Mat");
    disc1Mat.diffuseColor = new BABYLON.Color3.Yellow();
    disc1Mat.specularColor = new BABYLON.Color3.Yellow();
    
    disc1Mat.maxSimultaneousLights = 6;
    
    disc1.material = disc1Mat;

    var halfsphere2 = BABYLON.MeshBuilder.CreateSphere("halfsphere2", { slice:0.5, diameter: 35, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    halfsphere2.parent=halfsphere1;
    halfsphere2.rotation.x=(3/4)*Math.PI;

   
    halfsphere2.material = halfsphere1Mat;
    
    halfsphere2.showBoundingBox = false;
    
    var disc2 = BABYLON.MeshBuilder.CreateDisc("dis1", {radius: 17.5});
    disc2.parent=halfsphere2;
    disc2.rotation.x=-Math.PI/2;
    var arraypoints= [];

    var paceye1 = BABYLON.MeshBuilder.CreateSphere("paceye1 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    paceye1.parent=halfsphere2;
    paceye1.position.x=7;
    paceye1.position.z=10;
    paceye1.position.y=9;

    var paceye2 = BABYLON.MeshBuilder.CreateSphere("paceye2 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    paceye2.parent=halfsphere2;
    paceye2.position.x=-7;
    paceye2.position.z=10;
    paceye2.position.y=9;

    var pacpupil1 = BABYLON.MeshBuilder.CreateSphere("pacpupil1 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    pacpupil1.parent=paceye1;
    pacpupil1.position.x=1;
    pacpupil1.position.y=1;
    pacpupil1.position.z=4;


    var pacpupil2 = BABYLON.MeshBuilder.CreateSphere("pacpupil2 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    pacpupil2.parent=paceye2;
    pacpupil2.position.x=-1;
    pacpupil2.position.y=1;
    pacpupil2.position.z=4;

    var paceyeMat = new BABYLON.StandardMaterial("pacMat");
    paceyeMat.diffuseColor = new BABYLON.Color3.White();
    paceyeMat.specularColor = new BABYLON.Color3.White();
    paceyeMat.emissiveColor = new BABYLON.Color3.White();
    paceyeMat.maxSimultaneousLights = 6;
    
    paceye1.material = paceyeMat;
    paceye2.material=paceyeMat;

    var pacpupilMat = new BABYLON.StandardMaterial("pacMat");
    pacpupilMat.diffuseColor = new BABYLON.Color3.Black();
    pacpupilMat.specularColor = new BABYLON.Color3.Black();

    pacpupil1.material =pacpupilMat;
    pacpupil2.material =pacpupilMat;

    //GHOST

    var Cylinder = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {height:20, diameter:40}, scene);
    Cylinder.position.z=100;
    Cylinder.position.y=17.5;

    var ghostHead = BABYLON.MeshBuilder.CreateSphere("ghostHead", { slice:0.5, diameter: 40, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghostHead.parent=Cylinder;
    ghostHead.rotation.x=2*(Math.PI);
    ghostHead.position.y=10;

    var ghosteye1 = BABYLON.MeshBuilder.CreateSphere("ghosteye1 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghosteye1.parent=Cylinder;
    ghosteye1.position.x=7;
    ghosteye1.position.z=-14;
    ghosteye1.position.y=18;

    var ghosteye2 = BABYLON.MeshBuilder.CreateSphere("ghosteye2 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghosteye2.parent=Cylinder;
    ghosteye2.position.x=-7;
    ghosteye2.position.z=-14;
    ghosteye2.position.y=18;

    var ghostpupil1 = BABYLON.MeshBuilder.CreateSphere("ghostpupil1 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghostpupil1.parent=ghosteye1;
    ghostpupil1.position.x=1;
    ghostpupil1.position.y=1;
    ghostpupil1.position.z=-4;


    var ghostpupil2 = BABYLON.MeshBuilder.CreateSphere("ghostpupil2 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghostpupil2.parent=ghosteye2;
    ghostpupil2.position.x=-1;
    ghostpupil2.position.y=1;
    ghostpupil2.position.z=-4;
   
    var ghosteyeMat = new BABYLON.StandardMaterial("ghostMat");
    ghosteyeMat.diffuseColor = new BABYLON.Color3.White();
    ghosteyeMat.specularColor = new BABYLON.Color3.White();
    ghosteyeMat.emissiveColor = new BABYLON.Color3.White();
    ghosteyeMat.maxSimultaneousLights = 6;
    
    ghosteye1.material = ghosteyeMat;
    ghosteye2.material=ghosteyeMat;

    var ghostMat = new BABYLON.StandardMaterial("ghostMat");
    ghostMat.diffuseColor = new BABYLON.Color3.Red();
    ghostMat.maxSimultaneousLights = 6;
    Cylinder.material = ghostMat;
    ghostHead.material = ghostMat;

    //GHOST2

    var Cylinder2 = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {height:20, diameter:40}, scene);
    
    Cylinder2.position.y=17.5;

    var ghost2Head = BABYLON.MeshBuilder.CreateSphere("ghost2Head", { slice:0.5, diameter: 40, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghost2Head.parent=Cylinder2;
    ghost2Head.rotation.x=2*(Math.PI);
    ghost2Head.position.y=10;

    var ghost2eye1 = BABYLON.MeshBuilder.CreateSphere("ghost2eye1 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghost2eye1.parent=Cylinder2;
    ghost2eye1.position.x=7;
    ghost2eye1.position.z=-14;
    ghost2eye1.position.y=18;

    var ghost2eye2 = BABYLON.MeshBuilder.CreateSphere("ghost2eye2 ", {diameter: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghost2eye2.parent=Cylinder2;
    ghost2eye2.position.x=-7;
    ghost2eye2.position.z=-14;
    ghost2eye2.position.y=18;

    var ghost2pupil1 = BABYLON.MeshBuilder.CreateSphere("ghost2pupil1 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghost2pupil1.parent=ghost2eye1;
    ghost2pupil1.position.x=1;
    ghost2pupil1.position.y=1;
    ghost2pupil1.position.z=-4;


    var ghost2pupil2 = BABYLON.MeshBuilder.CreateSphere("ghost2pupil2 ", {diameter: 6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    ghost2pupil2.parent=ghost2eye2;
    ghost2pupil2.position.x=-1;
    ghost2pupil2.position.y=1;
    ghost2pupil2.position.z=-4;
   
    
    
    ghost2eye1.material = ghosteyeMat;
    ghost2eye2.material=ghosteyeMat;

    var ghost2Mat = new BABYLON.StandardMaterial("ghostMat");
    ghost2Mat.diffuseColor = new BABYLON.Color3.Magenta();
    ghost2Mat.maxSimultaneousLights = 6;
    Cylinder2.material = ghost2Mat;
    ghost2Head.material = ghost2Mat;

    arrayghosts=[Cylinder,Cylinder2];

    

    console.log(arraypoints.length);
    for (let i = -400; i <= 400; i+=50){
        for (let j = -400; j <= 400; j+=50){
            var point = BABYLON.MeshBuilder.CreateBox("point", {width: 7, height: 7, depth: 7})
            point.position=new BABYLON.Vector3(i,17.5,j);
            arraypoints.push(point);
            

        }

    }
    
    var pointsMat = new BABYLON.StandardMaterial('pointsMat', scene);
	pointsMat.diffuseColor = new BABYLON.Color3.White();
    pointsMat.emissiveColor = new BABYLON.Color3.White();
    pointsMat.alpha = 0.7;
    for (let i = 0; i < arraypoints.length; i++) {
        arraypoints[i].material=pointsMat;
        

    }
    var arraylights=[];
    var arrayBigPoints=[];

    var bigpointsMat = new BABYLON.StandardMaterial('bigpointsMat', scene);
	bigpointsMat.diffuseColor = new BABYLON.Color3.White();
    bigpointsMat.emissiveColor = new BABYLON.Color3.White();
    bigpointsMat.alpha = 0.7;

    var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(-400, 17.5, -400), scene);
    light1.range=200;
    arraylights.push(light1);

    
    

    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-400, 17.5, 400), scene);
    light2.range=200;
    arraylights.push(light2);

    var light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(400, 17.5, -400), scene);
    light3.range=200;
    arraylights.push(light3);

    var light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(400, 17.5, 400), scene);
    light4.range=200;
    arraylights.push(light4);

    console.log(arraylights.length);

    var bigpoint1 = new BABYLON.MeshBuilder.CreateBox("bigpoint1", {width: 15, height: 15, depth: 15})
    bigpoint1.position.x=-400;
    bigpoint1.position.y=17.5;
    bigpoint1.position.z=-400;
    bigpoint1.material=bigpointsMat;
    arrayBigPoints.push(bigpoint1);

    var bigpoint2 = new BABYLON.MeshBuilder.CreateBox("bigpoint2", {width: 15, height: 15, depth: 15})
    bigpoint2.position.x=-400;
    bigpoint2.position.y=17.5;
    bigpoint2.position.z=400;
    bigpoint2.material=bigpointsMat;
    arrayBigPoints.push(bigpoint2);

    var bigpoint3 = new BABYLON.MeshBuilder.CreateBox("bigpoint3", {width: 15, height: 15, depth: 15})
    bigpoint3.position.x=400;
    bigpoint3.position.y=17.5;
    bigpoint3.position.z=-400;
    bigpoint3.material=bigpointsMat;
    arrayBigPoints.push(bigpoint3);

    var bigpoint4 = new BABYLON.MeshBuilder.CreateBox("bigpoint4", {width: 15, height: 15, depth: 15})
    bigpoint4.position.x=400;
    bigpoint4.position.y=17.5;
    bigpoint4.position.z=400;
    bigpoint4.material=bigpointsMat;
    arrayBigPoints.push(bigpoint4);
    
    console.log(arraypoints.length);
    console.log(arrayBoxes.length);

    var pacmanvelocity=2.5;
    var ghostvelocity1=4;
    var ghostvelocity2=4;
    var stoppacman =false;
    //animation halfsphere1
    scene.registerBeforeRender(function () {
        try{
            
        
        var keydown = false;
            if(inputMap["w"] || inputMap["W"]  /*|| inputMap["ArrowUp"]*/ ){
                halfsphere1.position.z+=pacmanvelocity
                //halfsphere1.position.x+=0
                halfsphere1.rotation.y = 0
                keydown=true;
            } 
            if(inputMap["a"] || inputMap["A"] /*|| inputMap["ArrowLeft"]*/ ){
                halfsphere1.position.x-=pacmanvelocity
                //halfsphere1.position.z+=0
                halfsphere1.rotation.y = 3*Math.PI/2
                keydown=true;
            } 
            if(inputMap["s"] || inputMap["S"] /*|| inputMap["ArrowDown"]*/ ){
                halfsphere1.position.z-=pacmanvelocity
                //halfsphere1.position.x+=0
                halfsphere1.rotation.y = 2*Math.PI/2
                keydown=true;
            } 
            if(inputMap["d"] || inputMap["D"]  /*|| inputMap["ArrowRight"]*/ ){
                halfsphere1.position.x+=pacmanvelocity
                //halfsphere1.position.z+=0
                halfsphere1.rotation.y = Math.PI/2
                keydown=true;
            }
        } 
        catch(e){console.log(e)}
        
            
    });
    //PACMAN INITIAL POSITION
    

    //Mouth Animation
    
    const MouthMovement = new BABYLON.Animation("MouthMovement", "rotation.x", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: (3/4)*Math.PI
    });

    keyFrames.push({
        frame: 5,
        value: Math.PI
    });

    keyFrames.push({
        frame: 2 * 5,
        value: (3/4)*Math.PI
    });
    
    MouthMovement.setKeys(keyFrames);
    
    halfsphere2.animations.push(MouthMovement);

    scene.beginDirectAnimation(halfsphere2, [MouthMovement], 0, 2 * 5, true);

    //points rotation animation

    const PointRotation = new BABYLON.Animation("PointRotation", "rotation.y", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames2 = []; 

    keyFrames2.push({
        frame: 0,
        value: 0
    });

    keyFrames2.push({
        frame: 40,
        value: 2*Math.PI
    });
    
    //fluctuating points animation
    const Pointy = new BABYLON.Animation("Pointy", "position.y", 40, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames3 = []; 

    keyFrames3.push({
        frame: 0,
        value: 17.5
    });

    keyFrames3.push({
        frame: 40,
        value: 10
    });

    keyFrames3.push({
        frame: 2*40,
        value: 17.5
    });

    PointRotation.setKeys(keyFrames2);
    Pointy.setKeys(keyFrames3);
    for (let i=0; i<arraypoints.length; i++) {
        arraypoints[i].animations.push(PointRotation);
        scene.beginDirectAnimation(arraypoints[i], [PointRotation], 0, 2 * 20, true);
        arraypoints[i].animations.push(Pointy);
        scene.beginDirectAnimation(arraypoints[i], [Pointy], 0, 2 * 40, true);
        
    }

    for (let i = 0; i < arrayBigPoints.length; i++){
        arrayBigPoints[i].animations.push(PointRotation);
        scene.beginDirectAnimation(arrayBigPoints[i], [PointRotation], 0, 2 * 20, true);
        arrayBigPoints[i].animations.push(Pointy);
        scene.beginDirectAnimation(arrayBigPoints[i], [Pointy], 0, 2 * 40, true);
    }
    //fluctuating Ghosts
    Cylinder.animations.push(Pointy);
    scene.beginDirectAnimation(Cylinder, [Pointy], 0, 2 * 40, true);

    Cylinder2.animations.push(Pointy);
    scene.beginDirectAnimation(Cylinder2, [Pointy], 0, 2 * 40, true);

    //kill ghost animation

    const killghost = new BABYLON.Animation("killghost", "position.y", 40, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames4 = []; 

    keyFrames4.push({
        frame: 0,
        value: 17.5
    });

    keyFrames4.push({
        frame: 40,
        value: -30
    });
    keyFrames4.push({
        frame: 320,
        value: -30
    });
    keyFrames4.push({
        frame: 360,
        value: 17.5
    });
    killghost.setKeys(keyFrames4);

    //killpacman

    const killpacman = new BABYLON.Animation("killpacman", "position.y", 40, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = []; 

    keyFrames5.push({
        frame: 0,
        value: 17.5
    });

    keyFrames5.push({
        frame: 40,
        value: -30
    });
    keyFrames5.push({
        frame: 150,
        value: -30
    });
    
    killpacman.setKeys(keyFrames5);

    
    
    var plusx1=false;
    
    var minusx1=false;
    
    var plusz1=false;
    
    var minusz1=false;


    var plusx2=false;
    
    var minusx2=false;
    
    var plusz2=false;
    
    var minusz2=false;
    
    var superpacman =false;

    var ciao;

    var stopghost1=false;
    var stopghost2=false;

    var ghost1isdead=false;
    var ghost2isdead=false;
    scene.registerAfterRender(function () {
        for (let i=0; i<arrayBigPoints.length; i++){
            if (halfsphere1.intersectsMesh(arrayBigPoints[i],true) && superpacman==false){
                
                    superpacman=true;
                    ciao = setTimeout(function(){superpacman=false;}, 8000);
                }

            if (halfsphere1.intersectsMesh(arrayBigPoints[i],true) && superpacman==true){
                    clearTimeout(ciao);
                    ciao =setTimeout(function(){superpacman=false;}, 8000);
            }
        }
        if (counter==200){
            setTimeout(function(){scenevar=0;},3000);
        }
    

        if(superpacman==true){
            pacmanvelocity=3.5;
            ghostvelocity1=2;
            ghostvelocity2=2;
            halfsphere1Mat.emissiveColor = new BABYLON.Color3.Yellow();
            ghostMat.emissiveColor = new BABYLON.Color3.Teal();
            ghost2Mat.emissiveColor = new BABYLON.Color3.Teal();
            
                if (halfsphere1.intersectsMesh(Cylinder,true) && ghost1isdead==false){
                    stopghost1=true;
                    ghost1isdead=true;
                    //ghostvelocity1=0;
                    Cylinder.animations.push(killghost);
                    ghost1isdead=true;
                    scene.beginDirectAnimation(Cylinder, [killghost], 0, 360, true);
                    setTimeout(function(){if (!stoppacman){stopghost1=false;ghost1isdead=false;}}, 10000);

                }

                if (halfsphere1.intersectsMesh(Cylinder2,true) && ghost2isdead==false ){
                    stopghost2=true;
                    ghost2isdead=true;
                    //ghostvelocity2=0;
                    Cylinder2.animations.push(killghost);
                    
                    scene.beginDirectAnimation(Cylinder2, [killghost], 0, 360, true);
                    setTimeout(function(){if (!stoppacman){stopghost2=false;ghost2isdead=false;}},10000);
                    
                }
           
            
        }else{
            pacmanvelocity=2.5;
            ghostvelocity1=4;
            ghostvelocity2=4;
            halfsphere1Mat.emissiveColor = new BABYLON.Color3.Black();
            ghostMat.emissiveColor = new BABYLON.Color3.Black();
            ghost2Mat.emissiveColor = new BABYLON.Color3.Black();
            if ((halfsphere1.intersectsMesh(Cylinder,true) && ghost1isdead==false) || (halfsphere1.intersectsMesh(Cylinder2,true) && ghost2isdead==false)) {
                stopghost1=true;
                stopghost2=true;
                help=1;
                pacmanvelocity=0;
                stoppacman=true;
                if(plusx1){
                    Cylinder.position.x=Cylinder.position.x-5;
                    plusx1=false;
                }
                if(minusx1){
                    Cylinder.position.x=Cylinder.position.x+5;
                    minusx1=false;
                }
                if(plusz1){
                    Cylinder.position.z=Cylinder.position.z-5;
                    plusz1=false;
                
                }
                if(minusz1){
                    Cylinder.position.z=Cylinder.position.z+5;
                    minusz1=false;
                }

                if(plusx2){
                    Cylinder2.position.x=Cylinder2.position.x-5;
                    plusx2=false;
                }
                if(minusx2){
                    Cylinder2.position.x=Cylinder2.position.x+5;
                    minusx2=false;
                }
                if(plusz2){
                    Cylinder2.position.z=Cylinder2.position.z-5;
                    plusz2=false;
                
                }
                if(minusz2){
                    Cylinder2.position.z=Cylinder2.position.z+5;
                    minusz2=false;
                }

                halfsphere1.animations.push(killpacman);
                scene.beginDirectAnimation(halfsphere1, [killpacman], 0, 150, true);
                //setTimeout(function(){scenevar=0;},3000);


            }
        }

        //GHOST1 ANIMATION
        if (plusx1 && !stopghost1){Cylinder.position.x+=ghostvelocity1;}
        if (minusx1 && !stopghost1){Cylinder.position.x+=-ghostvelocity1;}
        if (plusz1 && !stopghost1){Cylinder.position.z+=ghostvelocity1;}
        if (minusz1 && !stopghost1){Cylinder.position.z+=-ghostvelocity1;}

        for (let i = 0; i < arrayBoxes.length; i++) {
            if(Cylinder.intersectsMesh(arrayBoxes[i], true)) {

                if(plusx1){
                    Cylinder.position.x=Cylinder.position.x-10;
                    plusx1=false;
                }
                if(minusx1){
                    Cylinder.position.x=Cylinder.position.x+10;
                    minusx1=false;
                }
                if(plusz1){
                    Cylinder.position.z=Cylinder.position.z-10;
                    plusz1=false;
                
                }
                if(minusz1){
                    Cylinder.position.z=Cylinder.position.z+10;
                    minusz1=false;
                }

            }
        }

        if (!plusx1 && !minusx1 && !plusz1 && !minusz1 && start) {
            let rand =Math.random();
            if (rand<=0.25){
                plusx1=true;
            }
            if (rand>0.25 && rand <=0.5){
                minusx1=true;
            }
            if (rand>0.5 && rand <=0.75){
                plusz1=true;
            }
            if (rand>0.75){
                minusz1=true;
            }
        }
        
        //GHOST2 ANIMATION
        if (plusx2 && !stopghost2){Cylinder2.position.x+=ghostvelocity2;}
        if (minusx2 && !stopghost2){Cylinder2.position.x+=-ghostvelocity2;}
        if (plusz2 && !stopghost2){Cylinder2.position.z+=ghostvelocity2;}
        if (minusz2 && !stopghost2){Cylinder2.position.z+=-ghostvelocity2;}

        for (let i = 0; i < arrayBoxes.length; i++) {
            if(Cylinder2.intersectsMesh(arrayBoxes[i], true)) {

                if(plusx2){
                    Cylinder2.position.x=Cylinder2.position.x-10;
                    plusx2=false;
                }
                if(minusx2){
                    Cylinder2.position.x=Cylinder2.position.x+10;
                    minusx2=false;
                }
                if(plusz2){
                    Cylinder2.position.z=Cylinder2.position.z-10;
                    plusz2=false;
                
                }
                if(minusz2){
                    Cylinder2.position.z=Cylinder2.position.z+10;
                    minusz2=false;
                }

            }
        }

        if (!plusx2 && !minusx2 && !plusz2 && !minusz2 && start) {
            let rand =Math.random();
            if (rand<=0.25){
                plusx2=true;
            }
            if (rand>0.25 && rand <=0.5){
                minusx2=true;
            }
            if (rand>0.5 && rand <=0.75){
                plusz2=true;
            }
            if (rand>0.75){
                minusz2=true;
            }
        }



        for (let i = 0; i < arraypoints.length; i++){
            if(halfsphere1.intersectsMesh(arraypoints[i], true)){
                arraypoints[i].position.x=-2000;
                //eatsound.play();
                counter+=1;
            }
        }
        for (let i = 0; i < arrayBigPoints.length; i++){
            if(halfsphere1.intersectsMesh(arrayBigPoints[i], true)){
                arrayBigPoints[i].position.x=-2000;
                arraylights[i].position.x=-2000;
                //eatsound.play();
                counter+=8;
            }
        }

        
        if (stoppacman==true || start ==false) {
            if(inputMap["w"] || inputMap["W"]  || inputMap["ArrowUp"]){
                halfsphere1.position.z-=pacmanvelocity
            }
            if( inputMap["s"] || inputMap["S"]  || inputMap["ArrowDown"]){
                halfsphere1.position.z+=pacmanvelocity
            }
            if(inputMap["a"] || inputMap["A"]  || inputMap["ArrowLeft"]){
                halfsphere1.position.x+=pacmanvelocity
            }
            if( inputMap["d"] || inputMap["D"]  || inputMap["ArrowRight"]){
                halfsphere1.position.x-=pacmanvelocity
            }
        }
        for (let i = 0; i < arrayBoxes.length; i++) {
            if(halfsphere1.intersectsMesh(arrayBoxes[i], true) && (inputMap["w"] || inputMap["W"]  || inputMap["ArrowUp"])){
                halfsphere1.position.z-=pacmanvelocity
            }
            if(halfsphere1.intersectsMesh(arrayBoxes[i], true) && (inputMap["s"] || inputMap["S"]  || inputMap["ArrowDown"])){
                halfsphere1.position.z+=pacmanvelocity
            }
            if(halfsphere1.intersectsMesh(arrayBoxes[i], true) && (inputMap["a"] || inputMap["A"]  || inputMap["ArrowLeft"])){
                halfsphere1.position.x+=pacmanvelocity
            }
            if(halfsphere1.intersectsMesh(arrayBoxes[i], true) && (inputMap["d"] || inputMap["D"]  || inputMap["ArrowRight"])){
                halfsphere1.position.x-=pacmanvelocity
            }
        }
         if (counter==200){ help=2;}
        

    });


    return scene;
}

//var gameScene = createGameScene();
let divCounter = document.getElementById("counter");
let divFps = document.getElementById("fps");
var scenemenu = createScenemenu();
engine.runRenderLoop(function() {
    

    if (scenevar==0){
        if ((scenemenu.getWaitingItemsCount() == 0))  {
            //window.document.getElementById("loadingBar").style.visibility = "hidden";
            engine.hideLoadingUI();
            scenemenu.render();
            window.document.getElementById("counter").style.visibility = "hidden";
            window.document.getElementById("points").style.visibility = "hidden";
            window.document.getElementById("fps").style.visibility = "hidden";
            window.document.getElementById("win").style.visibility = "hidden";
            window.document.getElementById("lose").style.visibility = "hidden";
        } else {
            //window.document.getElementById("loadingBar").style.visibility = "visible";
            engine.displayLoadingUI();
        }
    } else if (scenevar==1){
        if ((gameScene.getWaitingItemsCount() == 0))  {
            //window.document.getElementById("loadingBar").style.visibility = "hidden";
            engine.hideLoadingUI();
            gameScene.render();
            window.document.getElementById("counter").style.visibility = "visible";
            window.document.getElementById("points").style.visibility = "visible";
            window.document.getElementById("fps").style.visibility = "visible";
            window.document.getElementById("win").style.visibility = "hidden";
            window.document.getElementById("lose").style.visibility = "hidden";
            divCounter.innerHTML = counter;
            divFps.innerHTML = engine.getFps().toFixed() + " fps";
            if(help==2){
                window.document.getElementById("win").style.visibility = "visible";
                setTimeout(function(){scenevar=0; help =0;},3000);
            } else if (help==1) {
                window.document.getElementById("lose").style.visibility = "visible";
                setTimeout(function(){scenevar=0;help =0;},3000);
            } else if (help==0){
                window.document.getElementById("win").style.visibility = "hidden";
                window.document.getElementById("lose").style.visibility = "hidden";
            }
            
            //window.document.getElementById("loadingBar").style.visibility = "hidden";
        } else {
            //window.document.getElementById("loadingBar").style.visibility = "visible";
            engine.displayLoadingUI();
        }
    }
});

