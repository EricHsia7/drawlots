


interface TextSetElementObject {
  id: string
  type: 'text'
  text: string
}

interface ImageSetElementObject {
  id: string
  type: 'image'
  image: 
}

type SetElementObject = TextSetElementObject | ImageSetElementObject;

interface SetObject {
  id: string
  elements: Array<>
  name: string
  thumbnail: number
}


export async function listSets(): Array {

}