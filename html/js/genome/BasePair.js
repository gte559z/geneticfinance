/**
 * Utility object that expresses a single BasePair in the genome, but can also 
 * represent a patten across a larger region.
 * 
 * 
 * @param value a numeric value describing the value for a given {@code BasePair}
 * @param spaceInGenome an optional value describing how much space this site 
 * should run for. The default value is 1. 
 * </ul>
 */
function BasePair(value, spaceInGenome) {
   if (!this instanceof BasePair) {
        throw new Error("Error creating new BasePair. Must call with" + " 'new' opperator.");
    }
    
    this.spaceInGenome = spaceInGenome || 1;
    this.value = value;
}