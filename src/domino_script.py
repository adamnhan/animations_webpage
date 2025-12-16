import maya.cmds as cmds
import maya.OpenMaya as om


def reset_scene():
    """Start from a clean scene."""
    cmds.file(new=True, f=True)

def set_timeline(duration_seconds=10.0, fps=24):
    """Set the playback range to at least 10 seconds."""
    if fps == 24:
        cmds.currentUnit(time='film')  
    elif fps == 30:
        cmds.currentUnit(time='ntsc')   

    total_frames = int(duration_seconds * fps)
    cmds.playbackOptions(minTime=1, maxTime=total_frames)
    print("Timeline set to 1–{} frames".format(total_frames))

def create_ground():
    """Create a ground plane and make it a passive rigid body."""
    plane = cmds.polyPlane(w=50, h=50, sx=1, sy=1, name='groundPlane')[0]
    cmds.move(0, 0, 0, plane)
    # Make it a passive rigid body so dominoes will collide with it later
    cmds.select(plane)
    cmds.rigidBody(passive=True, name='groundRB')
    print("Created ground plane:", plane)
    return plane

def create_domino(name="dominoTest", width=0.3, height=0.8, depth=0.1):
    """Create a standing domino cube with rigid body."""
    domino = cmds.polyCube(w=width, h=height, d=depth, name=name)[0]

    cmds.xform(domino, pivots=[0, -height/2.0, 0], ws=True)

    cmds.move(0, height/2.0, 0, domino)

    cmds.select(domino)
    cmds.rigidBody(active=True, name=name + "_RB")

    print("Created domino:", name)
    return domino


    
def is_dark(color, threshold=0.5):
    """Return True if the (r,g,b) color is dark enough to be dynamic."""
    r, g, b = color
    brightness = (r + g + b) / 3.0
    return brightness < threshold

    
def create_domino_grid(rows=30, cols=30, spacing=0.6):
    """
    Create a grid of dominoes centered around the origin.
    Returns a list of (domino_name, row, col).
    """
    dominoes = []
    start_x = -(cols - 1) * spacing / 2.0
    start_z = -(rows - 1) * spacing / 2.0

    for r in range(rows):
        for c in range(cols):
            name = "domino_r{}_c{}".format(r, c)
            d = create_domino(name=name)
            x = start_x + c * spacing
            z = start_z + r * spacing
            cmds.move(x, 0.5, z, d)
            dominoes.append((d, r, c))

    print("Created {} dominoes in a {}x{} grid".format(len(dominoes), rows, cols))
    return dominoes


def prompt_for_image():
    """Ask user to choose the image for the domino reveal."""
    result = cmds.fileDialog2(
        caption="Choose image for domino reveal",
        fileMode=1,  
        fileFilter="Image Files (*.png *.jpg *.jpeg *.bmp)"
    )
    if result:
        img_path = result[0]
        print("Chosen image:", img_path)
        return img_path
    else:
        print("No image chosen.")
        return None
        
def get_image_size(img_path):
    """Return (width, height) of the image using Maya's API."""
    img = om.MImage()
    img.readFromFile(img_path)

    width_util = om.MScriptUtil()
    height_util = om.MScriptUtil()
    width_util.createFromInt(0)
    height_util.createFromInt(0)
    width_ptr = width_util.asUintPtr()
    height_ptr = height_util.asUintPtr()

    img.getSize(width_ptr, height_ptr)

    width = om.MScriptUtil(width_ptr).asUint()
    height = om.MScriptUtil(height_ptr).asUint()

    print("Image size: {} x {}".format(width, height))
    return width, height
    
def create_lambert(name, color):
    """Create a lambert material with given (r,g,b) 0–1 color."""
    mat = cmds.shadingNode('lambert', asShader=True, name=name)
    cmds.setAttr(mat + ".color", color[0], color[1], color[2], type="double3")
    sg = cmds.sets(renderable=True, noSurfaceShader=True, empty=True, name=name + "SG")
    cmds.connectAttr(mat + ".outColor", sg + ".surfaceShader", force=True)
    return mat, sg

def assign_shader(obj, shading_group):
    """Assign shading group to the shape node of the object (not the rigid body)."""
    shapes = cmds.listRelatives(obj, shapes=True, fullPath=True) or []
    if shapes:
        cmds.sets(shapes, e=True, forceElement=shading_group)



def get_color_grid(img_path, rows=30, cols=30):
    """
    Load the image, resize it to cols x rows, and return a 2D list of (r,g,b) in 0–1.
    grid[row][col] -> (r, g, b)
    """
    img = om.MImage()
    img.readFromFile(img_path)

    # Resize image to the grid size we want
    img.resize(cols, rows)

    w_util = om.MScriptUtil()
    h_util = om.MScriptUtil()
    w_util.createFromInt(0)
    h_util.createFromInt(0)
    w_ptr = w_util.asUintPtr()
    h_ptr = h_util.asUintPtr()
    img.getSize(w_ptr, h_ptr)
    w = om.MScriptUtil(w_ptr).asUint()
    h = om.MScriptUtil(h_ptr).asUint()
    print("Resized image to: {} x {}".format(w, h))

    pixels = img.pixels()  

    grid = []
    for r in range(h):
        row_colors = []
        for c in range(w):
            idx = (r * w + c) * 4

            r_byte = om.MScriptUtil.getUcharArrayItem(pixels, idx)
            g_byte = om.MScriptUtil.getUcharArrayItem(pixels, idx + 1)
            b_byte = om.MScriptUtil.getUcharArrayItem(pixels, idx + 2)

            r_val = r_byte / 255.0
            g_val = g_byte / 255.0
            b_val = b_byte / 255.0
            row_colors.append((r_val, g_val, b_val))
        grid.append(row_colors)

    print("Built color grid {}x{}".format(len(grid), len(grid[0]) if grid else 0))
    return grid

def color_dominoes(dominoes, color_grid):
    """
    dominoes: list of (domino_name, row, col)
    color_grid: 2D list of (r,g,b) in 0–1
    """
    if not color_grid:
        print("No color grid, skipping coloring.")
        return

    rows = len(color_grid)
    cols = len(color_grid[0])
    print("Coloring dominoes using a {}x{} color grid...".format(rows, cols))

    for (domino, r, c) in dominoes:
        if r < rows and c < cols:
            color = color_grid[r][c]
        else:
            color = (0.5, 0.5, 0.5)

        mat_name = "dominoMat_r{}_c{}".format(r, c)
        mat, sg = create_lambert(mat_name, color)
        assign_shader(domino, sg)

    print("Finished coloring dominoes.")

    
def setup_gravity():
    """Create a gravity field and connect it to all rigid bodies."""

    bodies = cmds.ls(type='rigidBody') or []
    if not bodies:
        print("No rigid bodies found for gravity.")
        return

    grav = cmds.gravity(name='dominoGravity', pos=(0, 0, 0), dx=0, dy=-1, dz=0, m=8.0)[0]

    cmds.select(bodies)
    cmds.connectDynamic(bodies, f=grav)

    print("Gravity set up and connected to {} rigid bodies.".format(len(bodies)))


def nudge_row_dominoes(dominoes, target_row=0):
    """
    Slightly tilt all dominoes in a given row so they fall together.
    dominoes: list of (domino_name, row, col)
    """
    count = 0
    for (domino, r, c) in dominoes:
        if r == target_row:
            cmds.rotate(10, 0, 0, domino, relative=True)
            count += 1
    print("Nudged {} dominoes in row {}".format(count, target_row))

def create_reveal_camera(rows=30, cols=30, spacing=0.6):
    """
    Create a camera positioned to see the entire domino grid fall.
    """
    cam, cam_shape = cmds.camera(name="revealCamera")

    center_x = 0
    center_z = 0
    center_y = 0.5 

    # Camera position: elevated and pushed back
    cmds.setAttr(cam + ".translateX", center_x)
    cmds.setAttr(cam + ".translateY", 20)
    cmds.setAttr(cam + ".translateZ", 25)

    # ---- AIM CAMERA USING POINT CONSTRAINT TRICK ----

    target_loc = cmds.spaceLocator(name="cameraTarget")[0]
    cmds.setAttr(target_loc + ".translateX", center_x)
    cmds.setAttr(target_loc + ".translateY", center_y)
    cmds.setAttr(target_loc + ".translateZ", center_z)

    constraint = cmds.aimConstraint(target_loc, cam, aimVector=(0,0,-1), upVector=(0,1,0), worldUpType="scene")

    cmds.delete(constraint)

    cmds.delete(target_loc)

    panel = cmds.getPanel(withFocus=True)
    if panel:
        cmds.modelEditor(panel, e=True, camera=cam)

    print("Created reveal camera:", cam)
    return cam


def create_basic_lighting():
    """Create a bright, clean key + fill light setup."""
    # Key light
    key = cmds.directionalLight(name="keyLight")
    key_shape = key  
    key_xform = cmds.listRelatives(key_shape, parent=True)[0]

    cmds.setAttr(key_xform + ".translateX", 20)
    cmds.setAttr(key_xform + ".translateY", 30)
    cmds.setAttr(key_xform + ".translateZ", 20)
    cmds.setAttr(key_xform + ".rotateX", -45)
    cmds.setAttr(key_xform + ".rotateY", -45)
    cmds.setAttr(key_xform + ".rotateZ", 0)

    cmds.setAttr(key_shape + ".intensity", 20)


    fill = cmds.directionalLight(name="fillLight")
    fill_shape = fill
    fill_xform = cmds.listRelatives(fill_shape, parent=True)[0]

    cmds.setAttr(fill_xform + ".translateX", -20)
    cmds.setAttr(fill_xform + ".translateY", 20)
    cmds.setAttr(fill_xform + ".translateZ", -10)
    cmds.setAttr(fill_xform + ".rotateX", -30)
    cmds.setAttr(fill_xform + ".rotateY", 150)
    cmds.setAttr(fill_xform + ".rotateZ", 0)

    cmds.setAttr(fill_shape + ".intensity", 20)

    print("Bright lighting created (intensity=20).")



def ask_and_playblast():
    """
    Ask the user if they want to create a playblast.
    If yes, playblast the current camera to the project's movies folder.
    """
    result = cmds.confirmDialog(
        title="Output Animation",
        message="Create a playblast of this animation?",
        button=["Yes", "No"],
        defaultButton="Yes",
        cancelButton="No",
        dismissString="No"
    )

    if result != "Yes":
        print("User chose not to playblast.")
        return

    start = cmds.playbackOptions(q=True, min=True)
    end = cmds.playbackOptions(q=True, max=True)

    cam = None
    cams = cmds.ls("revealCamera", type="transform")
    if cams:
        cam = cams[0]
    else:
        cam = cmds.lookThru(q=True)

    filename = "domino_playblast"

    print("Creating playblast from frame {} to {} using camera {}...".format(start, end, cam))

    cmds.playblast(
        filename=filename,
        format="avi",          
        compression="none",
        forceOverwrite=True,
        showOrnaments=False,
        percent=100,
        offScreen=True,
        viewer=True,
        startTime=start,
        endTime=end,
        sequenceTime=False,
        clearCache=True,
        useTraxSounds=False,
        widthHeight=(1280, 720)
    )

    print("Playblast complete. Check the 'movies' folder in your project.")


def main():
    reset_scene()
    set_timeline(duration_seconds=10.0, fps=24)

    rows = 30
    cols = 30

    img_path = prompt_for_image()
    color_grid = None
    if img_path:
        img_w, img_h = get_image_size(img_path)
        color_grid = get_color_grid(img_path, rows=rows, cols=cols)

    ground = create_ground()
    create_basic_lighting()
    cmds.grid(toggle=False)  # hide viewport grid so it looks cleaner
    dominoes = create_domino_grid(rows=rows, cols=cols, spacing=0.6)
    
    if color_grid:
        color_dominoes(dominoes, color_grid)
    
    create_reveal_camera(rows, cols)
    
    nudge_row_dominoes(dominoes, target_row=0)
    setup_gravity()
    ask_and_playblast()
    return img_path

main()