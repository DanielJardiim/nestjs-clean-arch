import { v4 as uuidv4 } from 'uuid'

export abstract class Entity<Props = any> {
  constructor(
    public readonly props: Props,
    public readonly _id?: string,
  ) {
    this.props = props
    this._id = _id || uuidv4()
  }

  get id() {
    return this.id
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
